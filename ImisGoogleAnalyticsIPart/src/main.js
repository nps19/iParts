import {ImisContextProvider} from "./services/imisContextProvider";

jQuery(payload);


function payload() {
    ImisContextProvider
        .getContextAsync()
        .then(
            context => {
                const userId = `${context.user.id}_${context.user.firstName}_${context.user.lastName}`.trim();
                callGoogleAnalytics(userId);
                console.log(`Call to GA is performed for user ${userId}.`);
            },
            reason => console.error(reason)
        );
}

function callGoogleAnalytics(userId) {

    const ga = initGA("imisGA");

    ga(
        "create",
        "UA-17922425-4",
        "auto",
        { userId: userId }
    );

    ga("send", "pageview");

}

function initGA(fieldName) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js', fieldName);
    return window[fieldName];
}
