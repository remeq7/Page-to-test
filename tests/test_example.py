from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

def test_open_website_and_check_title():
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
    url = "https://www.selenium.dev/"
    expected_title_part = "Selenium"

    try:
        driver.get(url)
        actual_title = driver.title
        if expected_title_part in actual_title:
            print(f"Test Passed: Tytuł strony zawiera '{expected_title_part}'")
        else:
            print(f"Test Failed: Oczekiwano tytułu zawierającego '{expected_title_part}', ale znaleziono '{actual_title}'")
    except Exception as e:
        print(f"Wystąpił błąd: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    test_open_website_and_check_title()