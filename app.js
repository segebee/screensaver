        function ScreenSaver(options={},movingobject={})
        {
            this.validateField = function(field) {return (field && field !== '')}

            this.elementName = this.validateField(options.elementName) ? options.elementName : '.screensaver'
            this.element = document.querySelector(this.elementName)
            this.interval = this.validateField(options.interval) ? parseInt(options.interval) : 10
            this.idleLimit = this.validateField(options.idleLimit) ? parseInt(options.idleLimit) : 1000
            this.idleCount = this.validateField(options.idleCount) ? parseInt(options.idleCount) : 0
            this.velocity = this.validateField(options.velocity) ? parseInt(options.velocity) : 10
            this.x = this.validateField(options.x) ? parseInt(options.x) : 0
            this.y = this.validateField(options.y) ? parseInt(options.y) : 0    
            this.width = this.element.offsetWidth
            this.height = this.element.offsetHeight

            this.directionX = ''
            this.directionY = ''

            this.movingobject = movingobject
            
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
            
            //console.log(screensaver.movingobject)
            screensaver.movingobject.element.style.margin = 0
            
            // console.log('xvelocity', screensaver.x+screensaver.velocity)
            // console.log('doc width', document.body.offsetWidth - screensaver.movingobject.element.offsetWidth)
            // console.log('yvelocity', screensaver.y+screensaver.velocity)
            // console.log('doc height', document.body.offsetHeight - screensaver.movingobject.element.offsetHeight)

            
            // //let position = screensaver.getPosition(screensaver.x,screensaver.y)
            // let x = screensaver.x
            // let y = screensaver.y
            // // screensaver.x = position.x
            // // screensaver.y = position.y

            let nosignalPosition =  movingobject.element.getBoundingClientRect();
            //console.log('position',nosignalPosition)
            screensaver.updatePosition(nosignalPosition)


            // screensaver.movingobject.element.style.transform = 'translate('+screensaver.direction+x+'px,'+y+'px)'
            //screensaver.movingobject.element.style.position = 'absolute'
            screensaver.movingobject.element.style.transform = `translate(${screensaver.directionX}${screensaver.x}px, ${screensaver.directionY}${screensaver.y}px`
            //screensaver.movingobject.element.style.transform = `translate(${screensaver.directionX}${x}px, ${screensaver.directionY}${y}px`
            // console.log('dX', screensaver.directionX)
            // console.log('x', screensaver.x)
            // console.log('dY', screensaver.directionY)
            // console.log('y',screensaver.y)
            //if (screensaver.directionX == '-' || screensaver.directionY == '-') clearInterval(screensaver.idleTimer)

        }

        ScreenSaver.prototype.updatePosition = function(position) {
            
            //let x,y,direction;
            let availableWidth = document.body.offsetWidth
            let availableHeight = document.body.offsetHeight

            // console.log('width',nosignal.offsetWidth)
            // console.log('docw',document.body.offsetWidth)

            let newPositionX = screensaver.x + screensaver.velocity
            let newPositionY = screensaver.y + screensaver.velocity
            //let yVelocity = y + velocity
            //screensaver.x = newPositionX
            console.log('new y',newPositionY)
            //console.log('new y',newPositionY)

            // console.log('xv',xVelocity)
            // console.log('yv',yVelocity)
            // console.log('availableWidth',availableWidth)
            // console.log('availableHeight',availableHeight)
            console.log('postop',position.top)
            console.log('available',availableHeight - movingobject.element.offsetHeight)

            //start handing x positions
            if ( position.left < availableWidth - movingobject.element.offsetWidth)
            {
                screensaver.x = screensaver.x + screensaver.velocity
            }
            
            if ( position.left > availableWidth - movingobject.element.offsetWidth)
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
            if ( position.top < availableHeight - movingobject.element.offsetHeight)
            {
                screensaver.y = screensaver.y + screensaver.velocity
            }
            
            if ( position.top > availableHeight - movingobject.element.offsetHeight)
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

        let movingobject = new movingObject() //initialise 
        let options = {}
        let screensaver = new ScreenSaver(options,movingobject) //initialise 
        screensaver.startListeners()

        console.log(screensaver.idleCount)
        
        //let min = 10, maxHeight = 100 - (min*2), maxWidth = 100 - (min*2)
        //let idleTimer,timer,randomY,randomX;



        

        // console.log(movingObject.width())
        // console.log(movingObject.height())
        
        //startListeners()
        

        // function startListeners()
        // {
        //     // DOM Events - run functions when events occur
        //     window.onload = stopIdleCounter;
        //     document.onmousemove = stopIdleCounter;
        //     document.onmousedown = stopIdleCounter;
        //     document.ontouchstart = stopIdleCounter;
        //     document.onclick = stopIdleCounter;
        //     document.onscroll = stopIdleCounter;
        //     document.onkeypress = stopIdleCounter;
        // }
        

        //console.log(idleCount)
        //if no activity after specified time, run screensaver
        // function activateScreenSaver() {
        //     if (idleCount === idleLimit) 
        //     {
        //         //enable screensaver
        //         screensaver.style.opacity= '1'
        //         timer = setInterval(startScreenSaver,interval)
        //     }
        // }

        // function runIdleCounter() 
        // {
        //     idleTimer = setInterval(idleCounter,1000)
        // }
        // function idleCounter() 
        // {
        //     idleCount += 1000; 
        //     //show user how long idle for
        //     document.getElementById('counter').innerHTML = idleCount/1000;
        //     //run screensaver
        //     activateScreenSaver();
        //     //console.log(idleCount)
        // }
        // function stopIdleCounter() 
        // {
        //     idleCount=0
        //     clearInterval(idleTimer)
        //     removeScreenSaver()
        //     runIdleCounter()
        // }

        //clear timer if activity resumes
        // function removeScreenSaver() {
        //     screensaver.style.opacity= '0'
        //     clearInterval(timer)
        // }

        // function startScreenSaver() {
        //     //run repeatedly
            

        //     // randomY = Math.floor( Math.random() * ( document.body.offsetHeight - nosignal.offsetHeight ) ) + 1
        //     // randomX = Math.floor( Math.random() * ( document.body.offsetWidth - nosignal.offsetWidth ) ) + 1

           
        //     // console.log('x: ',randomX)
        //     // console.log('y: ',randomY)


        //     // nosignal.style.top = randomY+'px'
        //     // nosignal.style.left = randomX+'px'
        //     nosignal.style.margin = 0
            
        //     console.log('xvelocity', x+velocity)
        //     console.log('doc width', document.body.offsetWidth - nosignal.offsetWidth)
        //     console.log('yvelocity', y+velocity)
        //     console.log('doc height', document.body.offsetHeight - nosignal.offsetHeight)

        //     let position = getPostition(x,y)
        //     x = position.x
        //     y = position.y

            

        //     nosignal.style.transform = 'translate('+x+'px,'+y+'px)'
        // }

        // function getPosition(x,y,direction) {
            
            
        //     let availableWidth = document.body.offsetWidth
        //     let availableHeight = document.body.offsetHeight

        //     // console.log('width',nosignal.offsetWidth)
        //     // console.log('docw',document.body.offsetWidth)

        //     let xVelocity = x + velocity
        //     let yVelocity = y + velocity
        //     //let yVelocity = y + velocity

        //     console.log('xv',xVelocity)
        //     console.log('yv',yVelocity)
        //     console.log('availableWidth',availableWidth)
        //     console.log('availableHeight',availableHeight)

        //     if ( xVelocity < availableWidth  ) 
        //     {
        //         x = xVelocity
        //     }
        //     else
        //     {
        //         x = x - velocity
        //     }

        //     if ( yVelocity < availableHeight  ) 
        //     {
        //         y = yVelocity
        //     }
        //     else
        //     {
        //         y = y - velocity
        //         direction = '-'
        //     }

        //     return {x,y,direction}
        // }
