var templates = (function() {


    var mainCardDefaultTemplate=`<div class="mdl-card__title">
              <h2 class="mdl-card__title-text">Segment Selection</h2>
            </div>
            <div class="mdl-card__supporting-text">
              Add, Combine and Remove Customer Segments...
            </div>`;

    var mainCardTemplate = `<div class="mdl-card__title">
              <h2 class="mdl-card__title-text">Segment Selection</h2>
            </div>
            <div class="mdl-card__supporting-text">
              Drag and Drop the selectors into query region...
            </div>
            <div class="mdl-card__actions mdl-card--border ">
              <div class="query-selectors">
                <button class="draggable-btn draggable-logic mdl-button mdl-js-button mdl-button--colored">And</button>
                <button class="draggable-btn draggable-logic mdl-button mdl-js-button mdl-button--colored">Or</button>
                <button class="draggable-btn draggable-segment mdl-button mdl-js-button mdl-color-text--grey-600">Location</button>
                <button class="draggable-btn draggable-segment mdl-button mdl-js-button mdl-color-text--grey-600">Browser</button>
                <button class="draggable-btn draggable-segment mdl-button mdl-js-button mdl-color-text--grey-600">OS</button>
                <button class="draggable-btn draggable-segment mdl-button mdl-js-button mdl-color-text--grey-600">Day</button>
                <button class="draggable-btn draggable-segment mdl-button mdl-js-button mdl-color-text--grey-600">Visitor type</button>
                <button class="draggable-btn draggable-segment mdl-button mdl-js-button mdl-color-text--grey-600">Mobile</button>
              </div>
              <div class="query-region droppable-main-region mdl-color-text--grey-500">
                
              </div>
              <div class="mdl-card generated-query">
                <div class="mdl-card__title">Generated query...</div>
                <div class="mdl-card__actions mdl-card--border mdl-color-text--grey-500">[ ]</div>
              </div>
              <div class="mdl-cell mdl-cell--2-col mdl-cell--5-offset">
                <button id="save-btn" class="mdl-button mdl-js-button mdl-button--raised ">Save</button>
              </div>
            </div>`;

    var andTemplate = `<div class="and-selector">
    <div class="close-btn"></div>
    <span>And</span>
</div>`;

    var orTemplate = `<div class="or-selector">
    <div class="close-btn"></div>
    <span>Or</span>
</div>`;

    var locationTemplate = `<div class="location-selector">
    <div class="close-btn"></div>
    <span>Location</span>
    <div class="mdl-grid">
        <div class="mdl-cell--5-col include-section">
            <div>Includes</div>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">India</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">US</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">UK</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Russia</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">China</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">France</button>
        </div>
        <div class="mdl-cell--5-col exclude-section">
            <div>Excludes</div>
        </div>
    </div>
</div>`;
    var dayTemplate = `<div class="day-selector">
    <div class="close-btn"></div>
    <span>Day</span>
    <div class="mdl-grid">
        <div class="mdl-cell--5-col include-section">
            <div>Includes</div>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Sunday</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Monday</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Tuesday</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Wednesday</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Thursday</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Friday</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Saturday</button>
        </div>
        <div class="mdl-cell--5-col exclude-section">
            <div>Excludes</div>
        </div>
    </div>
</div>`;
    var browserTemplate = `<div class="browser-selector">
    <div class="close-btn"></div>
    <span>Browser</span>
    <div class="mdl-grid">
        <div class="mdl-cell--5-col include-section">
            <div>Includes</div>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Chrome</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">IE</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Firefox</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Safari</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Opera</button>
        </div>
        <div class="mdl-cell--5-col exclude-section">
            <div>Excludes</div>
        </div>
    </div>
</div>`;
    var mobileTemplate = `<div class="mobile-selector">
    <div class="close-btn"></div>
    <span>Mobile</span>
    <div class="mdl-grid">
        <div class="mdl-cell--5-col include-section">
            <div>Includes</div>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Iphone</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Ipad</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Android</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Symbian</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Blackberry</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Windows Phone</button>
        </div>
        <div class="mdl-cell--5-col exclude-section">
            <div>Excludes</div>
        </div>
    </div>
</div>`;
    var osTemplate = `<div class="os-selector">
    <div class="close-btn"></div>
    <span>OS</span>
    <div class="mdl-grid">
        <div class="mdl-cell--5-col include-section">
            <div>Includes</div>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Windows</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Mac</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Linux</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Unix</button>
        </div>
        <div class="mdl-cell--5-col exclude-section">
            <div>Excludes</div>
        </div>
    </div>
</div>`;
    var visitorTemplate = `<div class="visitor-type-selector">
    <div class="close-btn"></div>
    <span>Visitor type</span>
    <div class="mdl-grid">
        <div class="mdl-cell--5-col include-section">
            <div>Includes</div>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">New</button>
            <button class="draggable-btn draggable-segment-option mdl-button mdl-js-button mdl-color-text--grey-600">Returning</button>
        </div>
        <div class="mdl-cell--5-col exclude-section">
            <div>Excludes</div>
        </div>
    </div>
</div>`;

    return {
        orTemplate: orTemplate,
        andTemplate: andTemplate,
        locationTemplate: locationTemplate,
        dayTemplate: dayTemplate,
        browserTemplate: browserTemplate,
        visitorTemplate: visitorTemplate,
        osTemplate: osTemplate,
        mobileTemplate: mobileTemplate,
        mainCardTemplate:mainCardTemplate,
        mainCardDefaultTemplate:mainCardDefaultTemplate
    };
})();