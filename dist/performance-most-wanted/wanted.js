
// TODO: Every time we do a performance audit, 
// we need to change the title to match the current report
// and link to the Google Doc with Recommendations and overviews
const results = {
  title: 'Q1 2023',
  url: 'https://docs.google.com/document/d/1ob2v1ZX2adU68Kmdc-tWuqWSBLDg0SAZemeYaxrHAB8/edit#'
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
const makePosters = (offenders=[]) => {

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

  offenders.forEach((offender) => {
    const posterTemplate = document.querySelector('#wanted-poster'),
      newPoster = posterTemplate.content.cloneNode(true);
    if (offender.vendor === 'Permutive') {
      newPoster.querySelector('.poster').classList.add('hover');
    }
    newPoster.querySelector('h2').textContent = offender.vendor;
    newPoster.querySelector('dl').innerHTML = chargeWithCrimes(offender.crimes);
    newPoster.querySelector('h3 em').textContent = offender.crimes.length;
    posterTemplate.parentNode.appendChild(newPoster);
  });
  return;
};

/**
 * initialize
 * @returns nothing
 */
const init = () => {
  fetchJson("wanted.json").then((offenders) => {
    makePosters(offenders);
    document.body.classList.remove('loading');
    document.querySelector('.hero h1').innerText = `${results.title} ${document.title}`;
    document.querySelector('.hero footer a').href = results.url;
  }).catch(console.error);
  return;
};

export { init }