var start;
        let started = 0;
        let move = 1
        let played = 0
        let mousex;
        let mousey;
        let currentMoveX;
        let currentMoveY = 595;
        let col = 0;
        let turn = 1;
        var list = [0, 0, 0, 0, 0, 0, 0];
        let redplayer = [];
        let yellowplayer = [];
        let redballs = 0;
        let yellowballs = 0;
        let level = 0;
        let mode = 0;

        window.addEventListener('load', function () {
            mode = sessionStorage.getItem("mode");
            level = sessionStorage.getItem("level");
            start = 0;
            document.getElementById('currentball').style.display = 'none';
            const game = JSON.parse(sessionStorage.getItem('game'));
            document.getElementById("name1").innerHTML = game.name1;
            document.getElementById("name2").innerHTML = game.name2;
            console.log(game.name1)
            console.log(game.name2)
        });
        document.getElementById("startbtn").onclick = function () {
            started = 1;
            start = 1;
            document.getElementById('currentball').style.display = 'block';
        }
        document.getElementById("resetbtn").onclick = function () {
            window.location.reload();
        }
        document.getElementById("mainwrapper").onmousemove = function (e) {
            if (start) {
                mousex = Number(e.clientX) - 50
                if (played == 0) {
                    document.getElementById('currentball').style.marginLeft = mousex + "px";
                }
            }

        }

        document.getElementById("mainwrapper").onclick = function (e) {
                if(started == 1){
                    started = 2;
                    return;
                }else if(played == 1||started == 0)
                    return
                    
                played = 1;
                determine_row_col(e)
                if(list[col]==6){
                    played = 0;
                    return;
                }
                
                movex();
                setTimeout(movey, 2000)
                setTimeout(resetball, 4000)
                setTimeout(wait_before_next_turn, 4000)
                setTimeout(computer,4000);
        }
        
        function determine_row_col(e)
        {
            currentMoveX = e.clientX;
                
                        start = 379;
                        for(let i = 0; i < 7; i++)
                        {
                            if(currentMoveX >= Number(start) && currentMoveX < Number(start+92))
                            {                            
                                currentMoveX = Number(start);
                                col = Number(i);
                                break;
                            }

                            start = Number(start+92);
                        }

                        if(currentMoveX>929)
                        {                       
                            currentMoveX=929
                            col = 6   
                        }
                        if(currentMoveX<377)
                        {
                            currentMoveX=377
                            col=0
                        }   
        }


       
        function movex() {
            document.getElementById('currentball').style.marginLeft = currentMoveX + "px";
        }
        function movey() {
            currentMoveY = Number(597 - (list[col] * 92))
            list[col] = list[col] + 1;
            document.getElementById('currentball').style.marginTop = currentMoveY + "px";
        }

        function resetball() {
            //set css for ball
            set_css()
            //new ball
            generate_new_ball()

        }

        function set_css() {
            const style = getComputedStyle(document.getElementById("currentball"))

            var marginLeft = style.marginLeft
            var marginTop = style.marginTop
            var backgroundColor = style.backgroundColor

            document.getElementById("currentball").id = "ball";

            document.getElementById("ball").style.marginLeft = marginLeft
            document.getElementById("ball").style.marginTop = marginTop
            document.getElementById("ball").style.backgroundColor = backgroundColor

            if (move == 1) {
                const style = getComputedStyle(document.getElementById("ball"))
                var marginLeft = style.marginLeft
                var marginTop = style.marginTop
                var backgroundColor = style.backgroundColor
                var newwball = document.createElement("div");
                newwball.id = "ball";
                newwball.style.marginLeft = marginLeft
                newwball.style.marginTop = marginTop
                newwball.backgroundColor = backgroundColor
                document.getElementById('balls').appendChild(newwball);
                move = 0;
            }
        }

        function generate_new_ball() {
            var newwball = document.createElement("div");
            newwball.id = "currentball";
            if (turn == 1) {
                newwball.style.backgroundColor = "red";
                turn = 2;
                yellowplayer[yellowballs++] = (list[col] - 1) * 7 + (col + 1);
                console.log("yellow " + yellowplayer);
            }
            else {
                newwball.style.backgroundColor = "yellow";
                turn = 1;
                redplayer[redballs++] = (list[col] - 1) * 7 + (col + 1);
                console.log("red " + redplayer);
            }
            newwball.style.marginLeft = mousex + "px";
            newwball.style.marginTop = "0px";
            newwball.style.transition = "1.0s";
            document.getElementById('balls').appendChild(newwball);

        }

        function wait_before_next_turn() {
            played = 0
            check_winner()
        }

      
        function check_winner() {
            if(level==0){
                if(win_level1(yellowplayer)){
                    alert("yellow player winnnnnnnnnnnnnnnnnnnnnnn")
                }
                if(win_level1(redplayer)){
                    alert("red player winnnnnnnnnnnnnnnnnnnnnnn")
                }
            }else{
                if(win_level2(yellowplayer)){
                    alert("yellow player winnnnnnnnnnnnnnnnnnnnnnn")
                }
                if(win_level2(redplayer)){
                    alert("red player winnnnnnnnnnnnnnnnnnnnnnn")
                }
            }
        }
     
        function win_level1(moves) {
            moves.sort(function(a, b){return a-b});
            for (let i = 0; i < moves.length; i++) {
                let rowwin = 1;
                if((moves[i]%7) <= 4){
                    for (let j = i ; j < i+3; j++) {
                        if (moves[j+1] - moves[j] == 1) {
                            rowwin++;
                            if(rowwin==4)
                                return true
                        }else{
                            break;
                        }
                    }
                }
                let colwin = 1;
                if((moves[i]+21) <= 42){
                    for (let j = (i+1) ; j < moves.length; j++) {
                        if (moves[j] - moves[j-1] == 7) {
                            colwin++;
                            if(colwin==4)
                                return true
                        }
                    }
                }
            }
            return false;
        }


        function win_level2(moves) {
            moves.sort(function(a, b){return a-b});
            for (let i = 0; i < moves.length; i++) {
                let rowwin = 1;
                if((moves[i]%7) <= 4){
                    for (let j = i ; j < i+4 && j<moves.length ; j++) {
                        if (moves[j+1] - moves[j] == 1) {
                            rowwin++;
                            if(rowwin==5)
                                return true
                        }else{
                            break;
                        }
                    }
                }
                let colwin = 1;
                if((moves[i]+28) <= 42){
                    for (let j = (i+1) ; j < moves.length; j++) {
                        if (moves[j] - moves[j-1] == 7) {
                            colwin++;
                            if(colwin==5)
                                return true
                        }
                    }
                }
                let forDiagonalWin = 1;
                if( ((moves[i]+32)%7) == 0 || ((moves[i]+32)%7) >= 5){
                    let x1 = moves[i];
                    for (let j = (i+1) ; j < moves.length; j++) {
                        let x2 = moves[j];
                        if (x2 - x1 == 8) {
                            x1 = x2;
                            forDiagonalWin++;
                            if(forDiagonalWin==5)
                                return true
                        }
                    }
                }
            }

            moves.reverse();
            for (let i = 0; i < moves.length; i++){
                let DiagonalWin = 1;
                if( (moves[i]-24) > 0 && (((moves[i]-24)%7) >= 5 || ((moves[i]-24)%7) == 0) ){
                    let x1 = moves[i];
                    for (let j = (i+1) ; j < moves.length; j++) {
                        let x2 = moves[j];
                        if (x1 - x2 == 6) {
                            x1 = x2;
                            DiagonalWin++;
                            if(DiagonalWin==5)
                                return true
                        }
                    }
                }
            }

            return false;
        }

        function computer(){
            if(mode==1){
                let rand_col = 0;
                while(rand_col==0){
                    let tmp = Math.floor(Math.random() * 7);
                    if(list[tmp]<6){
                        rand_col = tmp;
                    }
                }
                col = rand_col;
                currentMoveX = 379 + Number(92*col)
                played = 1
                movex();
                setTimeout(movey, 2000)
                setTimeout(resetball, 4000)
                setTimeout(wait_before_next_turn, 4000)
            }
        }
