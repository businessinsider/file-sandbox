// TODO: Every time we do a performance audit, 
// we need to add it to the list here
const results = {
  '2023-q1': 'wanted-2023-q1.json' // the first item in the list will be pulled for the index
};

const crimeTransforms = [
  { 
    "find": "Avoid bottleneck requests",
    "replace": "Bottleneck requests"
  },
  { 
    "find": "Reduce unused JavaScript and defer loading scripts until they are required",
    "replace": "Unused JS, undeferred scripts"
  },
  { 
    "find": "Avoid long main-thread tasks",
    "replace": "Long main-thread tasks"
  },
  { 
    "find": "Avoid enormous network payloads",
    "replace": "Enormous network payloads"
  },
  { 
    "find": "Serve static assets with an efficient cache policy",
    "replace": "Inefficient cache policy"
  },
  { 
    "find": "Reduce JS execution time",
    "replace": "Long JS execution time"
  },
  { 
    "find": "Long tasks that block ad-related network requests",
    "replace": "Long JS execution time"
  }
];

/**
 * Transforms crimes into shorter versions
 * so they fit on the wanted poster
 * @param {String} crimeText the text to transform
 * @returns {String} the transformed text
 */
const transformCrime = (crimeText) => {  
  crimeTransforms.forEach(transform => {
    crimeText = crimeText.replace(transform.find, transform.replace);
  });
  return crimeText;
}

/**
 * Utility func to fetch a JSON file
 * @param {String} file path to the JSON file
 * @returns {Promise} the file resolution
 */
const fetchJson = async (file) => {
  console.log(`fetchJson: fetching ${file}...`);
  const response = await fetch(file);
  if (response.ok) {
    const jsonValue = await response.json(); 
    return Promise.resolve(jsonValue);
  }
  return Promise.reject("error retrieving JSON data");
};

/**
 * Takes JSON, makes wanted posters
 * then appends them to the DOM
 * @param {Array} offenders contents of wanted.json
 * @returns nothing
 */
const makePosters = (data={}) => {

  /**
   * Creates the crime dt/dd markup
   * @param {Array} crimes text to transform
   * @returns {String} the transformed text
   */
  const chargeWithCrimes = (crimes=[]) => {
    const guiltyAsCharged = [];
    crimes.forEach((crime) => {
      guiltyAsCharged.push(`<dt>${transformCrime(crime.name)}</dt><dd>${crime.metric || `&#9785;`}`);
    });
    return guiltyAsCharged.join('');
  };

  const offenders = data.results;
  offenders.forEach((offender) => {
    // clone the poster template
    const posterTemplate = document.querySelector('#wanted-poster'),
      newPoster = posterTemplate.content.cloneNode(true);
    // modify the title, list & count of crimes
    newPoster.querySelector('h2').textContent = offender.vendor;
    newPoster.querySelector('dl').innerHTML = chargeWithCrimes(offender.crimes);
    newPoster.querySelector('h3 em').textContent = offender.crimes.length;
    // append the poster to the DOM
    posterTemplate.parentNode.appendChild(newPoster);
  });
  return;
};

/**
 * initialize
 * @returns nothing
 */
const init = () => {
  // grab the the first entry in the results map (above)
  const wantedJson = results[Object.keys(results)[0]];
  fetchJson(wantedJson).then((data) => {
    // make wanted posters
    makePosters(data);
    // modify the page title and link
    document.body.classList.remove('loading');
    document.querySelector('.hero h1').innerText = `${data.title} ${document.title}`;
    document.querySelector('.hero footer a').href = data.url;
  }).catch(console.error);
  return;
};

export { init }