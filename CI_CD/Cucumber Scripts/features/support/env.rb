require 'capybara/cucumber'

Capybara.default_wait_time = 20
Capybara.default_driver = :selenium_chrome


 Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.javascript_driver = :chrome