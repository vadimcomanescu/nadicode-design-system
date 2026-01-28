import os
import sys

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("Error: 'playwright' module not found.")
    print("Please run: pip install playwright && playwright install chromium")
    sys.exit(1)

def run():
    print("Starting visual verification...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Listen for console errors
        page.on("console", lambda msg: print(f"Browser Console: {msg.text}") if msg.type == "error" else None)
        page.on("pageerror", lambda exc: print(f"Browser Error: {exc}"))

        try:
            # 1. Visit Home
            print("Navigating to Home...")
            page.goto("http://localhost:5173")
            page.wait_for_load_state("networkidle")
            
            # Take screenshot of home
            screenshot_path = os.path.abspath("tests/artifacts/home_desktop.png")
            os.makedirs(os.path.dirname(screenshot_path), exist_ok=True)
            page.screenshot(path=screenshot_path, full_page=True)
            print(f"Captured: {screenshot_path}")

            # 2. Navigate to Layout Tab
            print("Navigating to Layout Tab...")
            page.click("text=Layout")
            page.wait_for_timeout(500) # Wait for animation
            
            screenshot_path_layout = os.path.abspath("tests/artifacts/layout_desktop.png")
            page.screenshot(path=screenshot_path_layout, full_page=True)
            print(f"Captured: {screenshot_path_layout}")

            # 3. Simulate Mobile
            print("Simulating Mobile View...")
            page.set_viewport_size({"width": 375, "height": 812})
            page.wait_for_timeout(500)
            
            screenshot_path_mobile = os.path.abspath("tests/artifacts/layout_mobile.png")
            page.screenshot(path=screenshot_path_mobile, full_page=True)
            print(f"Captured: {screenshot_path_mobile}")
            
            print("Verification Complete.")

        except Exception as e:
            print(f"Test Failed: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
