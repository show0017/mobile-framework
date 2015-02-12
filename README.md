# mobile-framework
This is web side for mobile-framework assignment

For this assignment you will be building your own app framework with HTML, CSS, and Javascript. Build a single HTML file that has three screens inside it. Build this app without jQuery.

Handle the 300ms delay ,to support the older browsers, and use the touchend event, if supported, instead of click. Use the Google Maps static API, Cordova Geolocation API, and Cordova Contacts API

 

Your interface has the following requirements:

1. Three tabs which each load one of the three screens at the top of the screen.

2. Only one of the three screen pages should be visible at a time.

3. There needs to be a CSS transition used to move the pages on and off the visible surface of the device.

4. There must be a consistent monochromatic colour scheme across the entire app (Black/dark-grey, white/light-grey, and one hue).

5. Use TWO font stacks for the entire app. (The user will only ever see two font-families)

6. The 300ms delay for touch events must be eliminated. Write the code to handle touch_end on the tabs.

7. Each tab must have its own icon. The icons can be web fonts or SVG images.

8. Page one (home) should have a custom title and a paragraph talking about how awesome your app is.

9. Page two should display a Google Static map with a marker for the users current location. The map can be displayed on a canvas tag or as an img tag.

10. Page three will fetch and display a random contact from the contacts in the device. This will use the Cordova Contacts api.
