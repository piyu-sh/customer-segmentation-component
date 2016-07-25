var templates = (function() {
    var andTemplate = `<div class="and-selector">
    <span>And</span>
</div>`;

    var orTemplate = `<div class="or-selector">
    <span>Or</span>
</div>`;

    var locationTemplate = `<div class="location-selector">
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
    var visitorTemplate = `<div class="visiter-type-selector">
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
        mobileTemplate: mobileTemplate
    };
})();


