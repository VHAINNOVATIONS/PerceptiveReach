require 'capybara/cucumber'

Capybara.default_wait_time = 15
Capybara.default_driver = :selenium_chrome


 Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Before do |scenario|
	page.driver.browser.manage.delete_all_cookies
	#page.driver.browser.manage.window.maximize
	target_size = Selenium::WebDriver::Dimension.new(1024, 768)
	page.driver.broswer.manage.window.size = target_size
end

Capybara.javascript_driver = :chrome