export default function ({ $auth, $config }) {
  if ($config.googleClientId) {
    $auth.strategies.google.client_id = $config.googleClientId
  }
}
