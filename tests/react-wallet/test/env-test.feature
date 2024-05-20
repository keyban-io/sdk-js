Feature: Environment setup verification for frontend and backend integration
  This feature ensures that the frontend can communicate with the RUST API through the /api/signer/health endpoint.

  @integration @frontend @backend @rust @health
  Scenario: Verify frontend can communicate with RUST API
    When the frontend sends a GET request to the RUST API "/api/signer/health" endpoint
    Then the response status should be 200
