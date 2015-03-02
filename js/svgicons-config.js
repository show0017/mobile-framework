var svgIconsConfig = {
 hamburgerCross : {
    url : 'svg/icon_hamburger_menu.svg',
    externalAnimationTrigger: true,
    animation : [
            {
                el : 'path:nth-child(1)',
                animProperties : {
                    from : { val : '{"path" : "m 5.0916789,20.818994 53.8166421,0"}' },
                    to : { val : '{"path" : "M 12.972944,50.936147 51.027056,12.882035"}' }				}
            },
            {
                el : 'path:nth-child(2)',
                animProperties : {
                    from : { val : '{"transform" : "s1 1", "opacity" : 1}', before : '{"transform" : "s0 0"}' },
                    to : { val : '{"opacity" : 0}' }
                }
            },
            {
                el : 'path:nth-child(3)',
                animProperties : {
                    from : { val : '{"path" : "m 5.0916788,42.95698 53.8166422,0"}' },
                    to : { val : '{"path" : "M 12.972944,12.882035 51.027056,50.936147"}' }
                }
            }
        ]
    },
 home:{
    url: 'svg/icon_home.svg',
    externalAnimationTrigger: true,
    animation : [
        {
            el : '#ceil', /* Move the ceil to the top*/
            animProperties : {
                from : { val : '{"path": "M216.6-0.2L58.2-2L1,87v9.4l134.1,29.1L205.4,9.3l75.9,90.9H301L216.6-0.2z"}' },
                to : { val : '{"path":"M216.6,15.4L58.2,13.6L1,102.6v9.4l134.1,29.1l70.3-116.2l75.9,90.9H301L216.6,15.4z"}' }
             }
        }
        ,
        {
            el : '#ceil',
            animProperties : {
                from : { val : '{"fill": "#C7EB00"}' }, /* #C7EB00 is equivalent to hsl(69,100%, 46%) */
                to : { val : '{"fill": "#f3efe0"}' }
            }
        }
        ,
        {
            el : '#windows',
            animProperties : {
                from : { val : '{"fill": "#343D00"}' }, /* #C7EB00 is equivalent to hsl(69,100%, 46%) */
                to : { val : '{"fill": "#f3efe0"}' }
            }
        }
        ,
        {
            el : '#body',
            animProperties : {
                from : { val : '{"fill": "#C7EB00"}' }, /* #C7EB00 is equivalent to hsl(69,100%, 46%) */
                to : { val : '{"fill": "#f3efe0"}' }
            }
        }
    ]

 },
location:{
    url: 'svg/icon_location.svg',
    externalAnimationTrigger: true,
    animation : [
            {
                el : '#pin',
                animProperties : {
                    from : { val : '{"fill": "#f3efe0"}' },
                    to : { val : '{"fill": "#C7EB00"}' }  /* #C7EB00 is equivalent to hsl(69,100%, 46%) */
                }
            },
            {
                el : '#pin',
                animProperties : {
                    from : { val : '{"path": "M216,102.1c0,50.3-41.9,59.7-61.6,108.1c-1.6,3.9-7.1,3.9-8.7,0c-17.8-43.6-53.6-55.5-60.4-94.4 c-6.7-38.2,19.7-75.7,58.4-79.3C182.9,32.8,216,63.6,216,102.1z M184.9,102.1c0-19.2-15.6-34.8-34.8-34.8s-34.8,15.6-34.8,34.8 s15.6,34.8,34.8,34.8C169.3,136.9,184.9,121.3,184.9,102.1z"}'},
                    to : { val :  '{"path" : "M216,65.9c0,50.3-41.9,59.7-61.6,108.1c-1.6,3.9-7.1,3.9-8.7,0c-17.8-43.6-53.6-55.5-60.4-94.4 C78.6,41.4,105,3.9,143.7,0.3C182.9-3.4,216,27.4,216,65.9z M184.9,65.9c0-19.2-15.6-34.8-34.8-34.8s-34.8,15.6-34.8,34.8 s15.6,34.8,34.8,34.8C169.3,100.7,184.9,85.1,184.9,65.9z"}'}
                }
            },
            {
                el : '#base',
                animProperties : {
                    from : { val : '{"fill": "#f3efe0"}' },
                    to : { val : '{"fill": "#C7EB00"}'} /* #C7EB00 is equivalent to hsl(69,100%, 46%) */
                }
            }
    ]
},
 contacts:{
    url: 'svg/icon_contacts.svg',
    externalAnimationTrigger: true,
    animation : [
        {
            el : '#eyes-tie-mouth-group',
            animProperties : {
                from : { val : '{"fill": "#f3efe0"}' },
                to : { val : '{"fill": "#C7EB00"}' } /* #C7EB00 is equivalent to hsl(69,100%, 46%) */
            }
        },
        {
            el : "#body",
            animProperties :{
                from : { val : '{"fill": "#f3efe0"}' },
                to : { val : '{"fill": "#C7EB00"}' } /* #C7EB00 is equivalent to hsl(69,100%, 46%) */
            }
        },
        {
            el : "#face",
            animProperties :{
                from : { val : '{"fill": "#f3efe0"}' },
                to : { val : '{"fill": "#343D00"}' } /* #343D00 is equivalent to hsl(69,100%, 12%) */
            }
        }

    ]

 },
 loading:{
    url: 'svg/icon_loading.svg',
    externalAnimationTrigger: false, /* This means that animation will run directly without any external trigger from user*/
    animation :[]
 }
};
