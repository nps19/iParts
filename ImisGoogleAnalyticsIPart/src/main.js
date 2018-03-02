import {ImisContextProvider} from "./services/imisContextProvider";

ImisContextProvider
    .getContextAsync()
    .then(
        context => {
            callGoogleAnalytics(context.user.id);
            console.log(`Call to GA is performed for user ${context.user.id}.`);
        },
        reason => console.error(reason)
    );

function callGoogleAnalytics(userId) {

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga(
        "create",
        "UA-17922425-4",
        "auto",
        { userId: userId }
    );

    ga("send", "pageview");

}