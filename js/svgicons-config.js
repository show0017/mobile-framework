var svgIconsConfig = {
 hamburgerCross : {
    url : 'svg/icon_hamburger_menu.svg',
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
    animation : [
        {
            el : '#ceil',
            animProperties : {
                from : { val : '{"path": "M216.6-0.2L58.2-2L1,87v9.4l134.1,29.1L205.4,9.3l75.9,90.9H301L216.6-0.2z"}' },
                to : { val : '{"path":"M216.6,15.4L58.2,13.6L1,102.6v9.4l134.1,29.1l70.3-116.2l75.9,90.9H301L216.6,15.4z"}' }
             }
        }
        ,
        {
            el : '#windows',
            animProperties : {
                from : { val : '{"fill": "#F7FF2A"}' },
                to : { val : '{"fill": "#000000"}' }
            }
        }
    ]

 },
// location:{
//     url: 'svg/icon_location.svg',
// },
 contacts:{
    url: 'svg/icon_contacts.svg',
    animation : [
        {
            el : '#eyes-tie-mouth-group',
            animProperties : {
                from : { val : '{"fill": "#000000"}' },
                to : { val : '{"fill": "#F7FF2A"}' }
            }
        }
    ]

 }
};
