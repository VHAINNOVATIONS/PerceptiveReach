require 'capybara/cucumber'

Capybara.default_wait_time = 20
Capybara.default_driver = :selenium_chrome


 Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Before do |scenario|
page.driver.browser.manage.window.maximize
page.driver.browser.reset
end
Capybara.javascript_driver = :chrome