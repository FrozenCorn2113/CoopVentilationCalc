// Is this browser ours rather than a visitor's?
//
// The 30-day affiliate_click reading found the metric's crawler filter
// (properties.internal != true) syntactically correct and completely inert: the
// capture call never set the property, so every row was NULL and the filter
// dropped nothing. An operator test click therefore landed inside the same
// number the placement work is graded on.
//
// Opt-in only, and deliberately not a heuristic. Visiting any page with
// ?internal=1 marks the tab for the rest of the session; nothing else sets it.
// A user-agent or IP guess would risk marking real clicks internal, and an
// undercount of real demand is a worse failure here than a test click we can
// already see in the event stream.

const KEY = 'cvc_internal'

export function isInternalTraffic(): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (new URL(window.location.href).searchParams.get('internal') === '1') {
      window.sessionStorage.setItem(KEY, '1')
    }
    return window.sessionStorage.getItem(KEY) === '1'
  } catch {
    // Private-mode storage throws. An unflagged click is the safe default.
    return false
  }
}
