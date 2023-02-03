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

const transformCrime = (crimeText) => {  
  crimeTransforms.forEach(transform => {
    crimeText = crimeText.replace(transform.find, transform.replace);
  });
  return crimeText;
}

const fetchJson = async (file) => {
  console.log(`fetchJson: fetching ${file}...`);
  const response = await fetch(file);
  if (response.ok) {
    const jsonValue = await response.json(); 
    return Promise.resolve(jsonValue);
  }
  return Promise.reject("error retrieving JSON data");
};

const makePosters = (offenders=[]) => {

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
};

const init = () => {
  fetchJson("wanted.json").then((offenders) => {
    makePosters(offenders);
    document.body.classList.remove('loading');
  }).catch(console.error);
};

export { init }