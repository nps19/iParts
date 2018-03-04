import {ImisContextProvider} from "./services/imisContextProvider";
import {ImisUser} from "./models";

jQuery(payload);


function payload() {
    ImisContextProvider
        .getContextAsync()
        .then(
            context => {
                const user = context.user;
                callGoogleAnalytics(user);
                console.log(`Call to GA is performed for user ${user.id} - ${user.fullName}.`);
            },
            reason => console.error(reason)
        );
}

/**
 * Performs call to GA
 * @param {ImisUser} user
 */
function callGoogleAnalytics(user) {
    console.log(user);
    const ga = initGA("imisGA");
    ga("create", "UA-17922425-4", "auto", { userId: `${user.id} - ${user.fullName}` });
    ga("set", "dimension1", user.memberType);
    ga("set", "dimension2", user.paidThrough);
    ga("set", "dimension3", user.company);
    ga("set", "dimension4", user.companyId);
    ga("set", "dimension6", user.joinDate);
    ga("send", "pageview");

}

function initGA(fieldName) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js', fieldName);
    return window[fieldName];
}
