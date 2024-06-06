Feature: Health check is performed

  Background:
    Given Homepage is opened

  Scenario: BE service is operational
    Given the status box is visible
    Then status box content is 'operational'

# Notes:
# - The server-side protection using Shamir's Secret Sharing will be implemented in a later iteration
# - Authentication to control access to the service will be implemented in a later iteration
