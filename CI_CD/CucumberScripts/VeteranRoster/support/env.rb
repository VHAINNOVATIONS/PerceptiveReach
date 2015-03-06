require 'capybara/cucumber'

Capybara.default_wait_time = 20
Capybara.default_driver = :selenium_firefox


 Capybara.register_driver :selenium_firefox do |app|
  Capybara::Selenium::Driver.new(app, :browser => :firefox)
end

Before do |scenario|
page.driver.browser.manage.window.maximize
end
Capybara.javascript_driver = :firefox
