Feature: Health check is performed

  Background:
    Given Mobile ios app is launched

  Scenario: BE service is down
    Given the status box is visible
    Then status box content is 'down'

# Notes:
# - The server-side protection using Shamir's Secret Sharing will be implemented in a later iteration
# - Authentication to control access to the service will be implemented in a later iteration
