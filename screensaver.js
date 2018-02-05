        function ScreenSaver(options={})
        {
            
            //validator
            this.validateField = function(field) {return (field && field !== '')}
            //init
            this.containerName = this.validateField(options.containerName) ? options.containerName : '.container'
            this.container = document.querySelector(this.containerName)
            let screenElement = "<div class='screensaver'><div class='nosignal'><div class='text'>NO SIGNAL</div></div></div>"
            this.container.innerHTML += screenElement
            
            //other vars
            this.elementName = this.validateField(options.elementName) ? options.elementName : '.screensaver'
            this.element = document.querySelector(this.elementName)
            
            this.interval = this.validateField(options.interval) ? parseInt(options.interval) : 500
            this.idleLimit = this.validateField(options.idleLimit) ? parseInt(options.idleLimit) : 5000
            this.idleCount = this.validateField(options.idleCount) ? parseInt(options.idleCount) : 0
            this.velocity = this.validateField(options.velocity) ? parseInt(options.velocity) : 10
            this.x = this.validateField(options.x) ? parseInt(options.x) : 0
            this.y = this.validateField(options.y) ? parseInt(options.y) : 0    
            this.width = this.element.offsetWidth
            this.height = this.element.offsetHeight

            this.directionX = ''
            this.directionY = ''

            this.movingobject = new movingObject(); 
        }

        ScreenSaver.prototype.removeScreenSaver = function() {
            screensaver.element.style.opacity= '0'
            clearInterval(screensaver.timer)
        }

        ScreenSaver.prototype.runIdleCounter = function() {

            screensaver.idleTimer = setInterval(screensaver.idleCounter,1000)
            //console.log(this)
        }

        ScreenSaver.prototype.stopIdleCounter = function () {
            screensaver.idleCount=0
            
            clearInterval(screensaver.idleTimer)
            screensaver.removeScreenSaver()
            screensaver.runIdleCounter()
        }

        ScreenSaver.prototype.idleCounter = function() {
            //console.log('cc', screensaver.idleCount)
            screensaver.idleCount += 1000; //increase by a second
            //show user how long idle for
            document.getElementById('counter').innerHTML = screensaver.idleCount/1000;
            //run screensaver
            screensaver.activateScreenSaver();
            //console.log(screensaver.idleCount)
        }

        ScreenSaver.prototype.activateScreenSaver = function() {
            if (screensaver.idleCount === screensaver.idleLimit) 
            {
                //enable screensaver
                screensaver.element.style.opacity= '1'
                screensaver.timer = setInterval(screensaver.startScreenSaver,screensaver.interval)
            }
        }

        ScreenSaver.prototype.startScreenSaver = function() {
            //console.log('moving obj',screensaver.movingobject)
            screensaver.movingobject.element.style.margin = 0

            let nosignalPosition =  screensaver.movingobject.element.getBoundingClientRect();
            screensaver.updatePosition(nosignalPosition)

            screensaver.movingobject.element.style.transform = `translate(${screensaver.directionX}${screensaver.x}px, ${screensaver.directionY}${screensaver.y}px`
        }

        ScreenSaver.prototype.updatePosition = function(position) {
            
            let availableWidth = document.body.offsetWidth
            let availableHeight = document.body.offsetHeight
            let objectWidth = screensaver.movingobject.element.offsetWidth
            let objectHeight = screensaver.movingobject.element.offsetHeight
            
            //start handing x positions
            if ( position.left < availableWidth - objectWidth)
            {
                screensaver.x = screensaver.x + screensaver.velocity
            }
            
            if ( position.left > availableWidth - objectWidth)
            {
                //reset x
                screensaver.x = 0
                screensaver.x = screensaver.x + screensaver.velocity
                screensaver.directionX = '-'
            }

            if ( screensaver.directionX == '-' && position.left < 0)
            {
                //reset x
                screensaver.x = 0
                screensaver.x = screensaver.x + screensaver.velocity
                screensaver.directionX = ''
            }

            // start handling y positions
            if ( position.top < availableHeight - objectHeight)
            {
                screensaver.y = screensaver.y + screensaver.velocity
            }
            
            if ( position.top > availableHeight - objectHeight)
            {
                //reset y
                screensaver.y = 0
                screensaver.y = screensaver.y + screensaver.velocity
                screensaver.directionY = '-'
            }

            if ( screensaver.directionY == '-' && position.top < 0)
            {
                //reset y
                screensaver.y = 0
                screensaver.y = screensaver.y + screensaver.velocity
                screensaver.directionY = ''
            }
               
        }


        
        ScreenSaver.prototype.startListeners = function() {
            // DOM Events - run functions when events occur
            window.onload = this.stopIdleCounter;
            document.onmousemove = this.stopIdleCounter;
            document.onmousedown = this.stopIdleCounter;
            document.ontouchstart = this.stopIdleCounter;
            document.onclick = this.stopIdleCounter;
            document.onscroll = this.stopIdleCounter;
            document.onkeypress = this.stopIdleCounter;
        }

        function movingObject()
        {
            this.element = document.querySelector('.nosignal')
            this.width = this.element.offsetWidth
            this.height = this.element.offsetHeight
        }

        

        function screenSaverInit(options={})
        {
            screensaver = new ScreenSaver(options) //initialise 
            screensaver.startListeners()
        }