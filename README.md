# customer-segmentation-component

Design a custom segmentation paradigm, for selecting a specific segment of visitors, whom the user would like to show a special version of his webpage.

Overview
Segmentation is used show a special version/variation of the user's webpage to a selected segment of users. Ideally, the user would enter the URL for that special version of his website on our tool and then specify all the segments that he would want to show this version to.

Some of the visitor segments are:
Location - All Countries
Browser - Chrome, Internet Explorer, Firefox, Safari, Opera
Operating system - Windows, Mac OS, Linux, Unix
Day of the week - Mon, Tue, Wed ....
Visitor type - New, Returning
Mobile Device- iPhone,iPad, Android, Symbian, Blackberry, Windows Phone

Use Case
Here's a use-case for a better understanding. Peter owns a computer e-commerce store in Canada, and wants to show a 'Friday Macbook Special' offer page only to people who don't yet own a Mac computer. He also thinks that people who own an iPhone/iPad might be interested in buying a mac computer.

Hence, an example of what his segment selection might look like:
['Location= Canada'] AND ['Day= Friday'] AND ['Operating system=all except Mac-OS' OR 'Mobile Device= iPhone, iPad']

The Challenge
The challenge is to design and implement an UI module that allows users to easily select and create a complex combination of visitor segments that they want to target. At the same time, it shouldn't be too much in the user's face by showing them all the segment fields open, if they don't want to target any specific segment (which is the default action). 
