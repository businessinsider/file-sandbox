(() => {
  window.googletag = window.googletag || { cmd: [] };

  const getSlots = () => window.googletag.pubads().getSlots() || [];

  const getGptSlot = (slotId, gptSlots = window.googletag.pubads().getSlots()) => {
    let gptSlot = gptSlots.filter(slot => slot.getSlotElementId() === slotId);
    if (gptSlot) {
      return gptSlot[0];
    }
    return false;
  };

  const getTargeting = (gptSlot, gptSlots) => {
    if (typeof gptSlot === 'string') gptSlot = getGptSlot(gptSlot, gptSlots);
    const gptRef = gptSlot || window.googletag.pubads();
    const targetingMap = {};
    for (const key of gptRef.getTargetingKeys()) {
      targetingMap[key] = gptRef.getTargeting(key);
    }
    return targetingMap;
  };

  const uppercaseFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const transformResponse = (responseInfo) => {
    const transformedResponse = {};
    const gamNetworkId = Object.entries(window.googletag.pubads().getSlotIdMap())[0][0].split('/').filter(v => v)[0];
    const gamLinkMap = {
      'advertiserId': 'admin/company/detail/company_id=',
      'creativeId': 'creatives/creative/detail/creative_id=',
      'lineItemId': 'delivery/line_item/detail/line_item_id='
    }
    for (key of Object.keys(gamLinkMap)) {
      if (responseInfo[key]) {
        const sourceAgnosticKey = `sourceAgnostic${uppercaseFirstLetter(key)}`;
        const sourceAgnosticValue = responseInfo[sourceAgnosticKey];
        let value = sourceAgnosticValue || responseInfo[key];
        transformedResponse[key] = `<a href="https://admanager.google.com/${gamNetworkId}#${gamLinkMap[key]}${value}" target="_blank">${value}</a>`;        
      }
    }
    return transformedResponse;
  };

  const populateList = (data) => {    
    if (!data) return '';
    const listMarkup = [];
    for (key of Object.keys(data).sort()) {
      listMarkup.push(`
        <dt>${key}</dt>
        <dd>${Array.isArray(data[key]) ? data[key].join(', ') : data[key]}</dd>`);
    }
    return listMarkup.join('');
  };

  const generateSlotMarkup = gptSlots => {
    const slotMarkup = [``];
    for (const gptSlot of gptSlots) {
      const slotTargeting = getTargeting(gptSlot, gptSlots);
      const slotResponseInfo = gptSlot.getResponseInformation();
      const slotSizes = gptSlot.getSizes();
      slotMarkup.push(
        `<details open>`,
          `<summary>Slot id: #${gptSlot.getSlotElementId()}</summary>`,
          slotResponseInfo ?
            `<h4>Ad Response</h4>
              <dl class="responseInfo">
                ${populateList(transformResponse(slotResponseInfo))}
              </dl>` : '',
          `<dl class="slotTargeting">
            <dt class="highlight">Ad Unit</dt>
            <dd class="highlight">${gptSlot.getAdUnitPath()}</dd>`,
          slotSizes.length ? `
            <dt class="highlight">Ad Sizes</dt>
            <dd>${slotSizes.map(e => "function" == typeof e.getWidth ? e.getWidth() + "x" + e.getHeight() : e)}</dd>` : '',
            populateList(slotTargeting), 
          `</dl>`,
          `</details>`
      )
    }
    return slotMarkup.join('');
  };

  const populateModal = () => {
    const gptSlots = getSlots();
    return `
      <dialog id="insiderAdsDialog" open>
        <h1>Insider Ads</h1>
        <details id="insiderAdsPageTargeting" open>
          <summary>Page-Level Targeting</summary>
          <dl class="pageTargeting">
            ${populateList(getTargeting())}
          </dl>
        </details>
        <details open>
          <summary>Slots</summary>
          ${generateSlotMarkup(gptSlots)}
        </details>
        <form method="dialog">
          <button class="close">&times;</button>
        </form>
      </dialog>`;
  };

  const injectModalStyles = () => {
    const modalCss = `
      #insiderAdsDebug{
        z-index: 3000;
        position: fixed;
        top: var(--sticky-top);
        font-size: 0.8rem;
      }
      #insiderAdsDialog button.close{
        position: absolute;
        top: 0.25rem;
        right: 0;
        border: 1px solid transparent;
        border-radius: 50%;
        background-color: #ccc;
        font-weight: bold;
      }
      #insiderAdsDialog{
        margin: 0;
        min-width: 500px;
        max-width: 500px;
        max-height: 90vh;
        overflow: scroll;
      }
      #insiderAdsDialog h1 {
        text-align: center;
      }
      #insiderAdsDialog dl {
        display: grid;
	      grid-template-columns: max-content 1fr;
        align-items: stretch;
        border-bottom: 1px solid #ddd;
      }
      #insiderAdsDialog dt, #insiderAdsDialog dd{
        overflow-wrap: break-word;
        margin: 0;
        padding: 0 .125rem 0 .25rem;
        border: solid #ddd;
        border-width: 1px 1px 0 1px;
        border-collapse: collapse;
      }
      #insiderAdsDialog dt:after {
        content: ': ';
      }
      #insiderAdsDialog dt.highlight {
        background: #dedede;
      }
      #insiderAdsDialog dd.highlight {
        background: #efefef;
      }
      #insiderAdsDialog h1, #insiderAdsDialog h2, #insiderAdsDialog h3, #insiderAdsDialog h4, #insiderAdsDialog summary {
        font-weight: bold; 
        margin-bottom: 0.5rem; 
        color: #333;
      }
      #insiderAdsDialog summary, #insiderAdsDialog h2{ 
        font-size: 1.2rem; 
      }
      #insiderAdsDialog h3, #insiderAdsDialog details details summary{ 
        font-size: 1.1rem; 
      }
      #insiderAdsDialog h4{ 
        font-size: 1rem; 
      }
    `;
    const styleSheetId = 'insiderAdsDebugStyles';
    const existingStylesheet = document.getElementById(styleSheetId);

    // if the stylesheet exists on the page, replace its contents
    if (existingStylesheet) {
      existingStylesheet.innerText = modalCss;
    // otherwise, append the stylesheet to the head
    } else {
      const styleSheet = document.createElement('style');
      styleSheet.id = styleSheetId;
      styleSheet.innerText = modalCss;
      document.head.appendChild(styleSheet);
    }
  };

  const openModal = () => {
    const modalMarkup = populateModal();
    const bookmarkletHolder = document.createElement('section');
    bookmarkletHolder.id = 'insiderAdsDebug';
    bookmarkletHolder.innerHTML = modalMarkup;
    injectModalStyles();
    const existingHolder = document.getElementById(bookmarkletHolder.id);
    if (existingHolder) {
      return existingHolder.parentNode.replaceChild(bookmarkletHolder, existingHolder);
    } 
    return document.body.appendChild(bookmarkletHolder);
  }

  window.googletag.cmd.push(openModal);
})();