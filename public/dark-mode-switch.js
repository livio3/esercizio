//get element
const date = document.getElementById('date');
const nswitch = document.getElementById('nswitch');
const status = document.getElementById('status');
const ndarkmode = document.getElementById('ndarkmode');
const nlightmode = document.getElementById('nlightmode');
const darkSwitch = document.getElementById('darkSwitch');


window.addEventListener('load', () => {
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener('change', () => {
      resetTheme();
      fetch('/change', {method: 'POST', headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },//pass the current status of the switcher
        body: JSON.stringify({
          status: localStorage.getItem('darkSwitch')
        })})
          .then(function(response) {
            if(response.ok) {
              return response.json()
            }
            throw new Error('Request failed.');
          }).then(function(data) {
              //data === change
              date.innerHTML = 'last modification time ' + data.dataChange;
              nswitch.innerHTML = 'number of switch ' + data.nclick;
              status.innerHTML = 'status: ' + data.status;
              ndarkmode.innerHTML = 'number of switch in dark mode: ' + data.n_dark_mode;
              nlightmode.innerHTML = 'number of switch in light mode: ' + data.n_light_mode;

      })
          .catch(function(error) {
            console.log(error);
          });

    });
  }
});


/**
 *  initTheme is a function that uses localStorage from JavaScript DOM,
 * to store the value of the HTML switch. If the switch was already switched to
 * 'on' it will set an HTML attribute to the body named: 'data-theme' to a 'dark'
 * value. If it is the first time opening the page, or if the switch was off the
 * 'data-theme' attribute will not be set.
 */
function initTheme() {
  const darkThemeSelected =
    localStorage.getItem('darkSwitch') !== null &&
    localStorage.getItem('darkSwitch') === 'dark';
  darkSwitch.checked = darkThemeSelected;
  darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') :
    document.body.removeAttribute('data-theme');
}


/**
 * resetTheme checks if the switch is 'on' or 'off' and if it is toggled
 * on it will set the HTML attribute 'data-theme' to dark so the dark-theme CSS is
 * applied.
 */
function resetTheme() {
  if (darkSwitch.checked) {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('darkSwitch', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
    localStorage.removeItem('darkSwitch');
  }
}
