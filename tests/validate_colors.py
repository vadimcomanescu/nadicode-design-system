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
                if file_path not in IGNORE_HEX_IN_FILES:
                    hexes = hex_pattern.findall(line)
                    for hex_code in hexes:
                         # Ignore white/black often used in SVGs or specific non-token needs
                         if hex_code.lower() not in ['#fff', '#ffffff', '#000', '#000000']:
                            errors.append(f"[HARDCODED HEX] {file_path}:{line_num}: {hex_code} found. Should use a design token.")

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
