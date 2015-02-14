var hamburgerCross = {
		url : 'svg/hamburger.svg',
		animation : [
			{
				el : 'path:nth-child(1)',
				animProperties : {
					from : { val : '{"path" : "M-111.9,139.8h53.8}' },
					to : { val : '{"path" : "M-111.9,164l53.8-24.2"}' }
				}
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
					from : { val : '{"path" : "M-111.9,162h53.8"}' },
					to : { val : '{"path" : "M-111.9,139.8l53.8,22.1"}' }
				}
			}
		]
    };
