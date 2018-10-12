const request = require('request');
const octokit = require('@octokit/rest')({
    timeout: 0,
    headers: {
        accept: 'application/vnd.github.v3+json',
        'user-agent': 'octokit/rest.js v1.2.3'
    },
    baseUrl: 'https://api.github.com',
    agent: undefined
});

octokit.authenticate({
    type: 'token',
    token: '<YOUR TOKEN>'
});

octokit.activity.getNotifications({all: true}, (error, result) => {
    let hasResults = false;
    let octocatMsg = 'Here are your Github Notifications';

    for (i = 0; i < result.data.length; i++) {
        if (result.data[i].unread === true) {
            if (!hasResults) hasResults = true; 
        }
    }

    if (!hasResults) octocatMsg = 'No new Github notifications';

    const options = {
        url: 'https://api.github.com/octocat?s=' + octocatMsg,
        headers: {
            'User-Agent': 'request'
        }
    };
    
    handleRequest = (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }

        for (i = 0; i < result.data.length; i++) {
            if (result.data[i].unread === true) {
                console.log('');
                console.log('' + (i + 1) + '' + '. == Repo: ' + result.data[i].repository.name);
                console.log('===== Title: ', result.data[i].subject.title);
                console.log('===== URL: ', result.data[i].subject.url);
                console.log('');
            }
        }
    };
    
    request(options, handleRequest);
    
    if (error) console.log(error);
});
