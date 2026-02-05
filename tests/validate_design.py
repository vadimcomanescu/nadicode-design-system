import os
import re
import sys

# Configuration
SOURCE_DIR = "src"
CSS_DEFINITION_FILE = "src/index.css"
ALLOWED_EXTENSIONS = {".tsx", ".ts", ".css"}
IGNORE_HEX_IN_FILES = {
    "src/index.css", # Definitions themselves
    "src/App.tsx",   # Documentation/Demo needing explicit hex display
    "src/components/ui/CheckoutFormDemo.tsx", # Stripe API requires hex
    "src/tokens.test.ts", # Tests contain specific checks
    "src/components/ui/Chart.tsx", # Targets Recharts default hex values for overrides
    "src/components/ui/BrandIcons.tsx", # Brand colors are specific and should not be tokenized
    "src/components/logos/", # Brand logos
    "src/components/sign-up.tsx", # Social icons with brand hex
}

def parse_css_variables(file_path):
    """Extracts CSS variable names from the definition file."""
    defined_vars = set()
    with open(file_path, 'r') as f:
        content = f.read()
        # Match --variable-name:
        matches = re.findall(r'(--[a-zA-Z0-9-]+):', content)
        defined_vars.update(matches)
    return defined_vars

def scan_files(source_dir, defined_vars):
    """Scans files for undefined variables and hardcoded hex values."""
    errors = []
    
    # Regex patterns
    var_usage_pattern = re.compile(r'var\((--[a-zA-Z0-9-]+)\)')
    hex_pattern = re.compile(r'#(?:[0-9a-fA-F]{3}){1,2}\b')
    
    for root, _, files in os.walk(source_dir):
        for file in files:
            ext = os.path.splitext(file)[1]
            if ext not in ALLOWED_EXTENSIONS:
                continue
                
            file_path = os.path.join(root, file)
            
            with open(file_path, 'r') as f:
                try:
                    lines = f.readlines()
                except UnicodeDecodeError:
                    continue
                    
            for i, line in enumerate(lines):
                line_num = i + 1
                
                # Check 1: Undefined Variables
                usages = var_usage_pattern.findall(line)
                for var in usages:
                    if var not in defined_vars:
                        # Some vars might be defined dynamically or globally (like tailwind internal)
                        # We focus on our design system vars usually starting with --color, --chart, --sidebar
                        if var.startswith("--color-") or var.startswith("--chart-") or var.startswith("--sidebar-"):
                             errors.append(f"[UNDEFINED VAR] {file_path}:{line_num}: {var} is used but not defined in {CSS_DEFINITION_FILE}")

                # Check 2: Hardcoded Hex Codes
                if not any(ign in file_path for ign in IGNORE_HEX_IN_FILES):
                    hexes = hex_pattern.findall(line)
                    for hex_code in hexes:
                         # Ignore white/black often used in SVGs or specific non-token needs
                         if hex_code.lower() not in ['#fff', '#ffffff', '#000', '#000000']:
                            errors.append(f"[HARDCODED HEX] {file_path}:{line_num}: {hex_code} found. Should use a design token.")

                # Check 3: Consistency & Non-Semantic Classes
                forbidden_patterns = [
                    r'bg-(?:zinc|gray|slate|neutral|stone|red|blue|green)-[0-9]+', # e.g. bg-zinc-950
                    r'text-(?:zinc|gray|slate|neutral|stone|red|blue|green)-[0-9]+', # e.g. text-gray-500
                    r'bg-(?:white|black)(?!\/)', 
                    
                    # FORBIDDEN: Legacy Material Names (These no longer exist in code)
                    r'variant=["\']glass["\']', 
                    r'variant=["\']glass-atmospheric["\']',
                    r'class.*glass-card',
                    r'class.*glass-atmospheric',
                ]
                
                for pattern in forbidden_patterns:
                    if re.search(pattern, line):
                        if "validate_design.py" not in file_path:
                             errors.append(f"[FORBIDDEN PATTERN] {file_path}:{line_num}: Found forbidden pattern '{pattern}'. This logic has been deleted. Use 'glass-panel' or 'glass-overlay'.")

                # Check 4: Manual Hover on Cards (Design Rule: If it lifts, it clicks)
                if "<Card" in line:
                    if "hover:scale" in line or "hover:translate" in line or "hover:border" in line:
                        # Allow interactive property which adds these classes internally, but ban manual addition
                        errors.append(f"[DESIGN RULE] {file_path}:{line_num}: Manual hover styles found on <Card>. Use 'interactive' prop for clickable cards, or remove hover effects for static ones.")

    return errors

def main():
    print(f"🔍 Scanning design system in '{SOURCE_DIR}'...")
    
    if not os.path.exists(CSS_DEFINITION_FILE):
        print(f"❌ Definition file {CSS_DEFINITION_FILE} not found.")
        sys.exit(1)
        
    defined_vars = parse_css_variables(CSS_DEFINITION_FILE)
    print(f"✅ Found {len(defined_vars)} defined CSS variables.")
    
    errors = scan_files(SOURCE_DIR, defined_vars)
    
    if errors:
        print(f"❌ Found {len(errors)} validation errors:")
        for err in errors:
            print(err)
        sys.exit(1)
    else:
        print("✅ Design System Validation Passed: No undefined variables or unapproved hex codes found.")
        sys.exit(0)

if __name__ == "__main__":
    main()
