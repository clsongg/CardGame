/*
1. 카드숫자섞어서 뿌리기
2. 클릭했을때 이벤트(뒤집기-두번/매칭-맞고,틀리고/)
3. 스코어
*/
var m4 = m4 || {};
m4.hasJqueryObject = function($elem){return $elem.length > 0;};
m4.cardGame = new function() {
    this.init = function() {
		this.mixNum();
		this.handleClickEvent();
		//스코어
		this.score = 0;
	};

	this.mixNum = function() {
		var cardLength = $('.card').length; //16
		var cardTwin = cardLength / 2; //8
		var cardNum = [];
		var cardNumBox;
		var cardNumMix;

		//1 ~ 8 두번씩 배열에 담기
		for(var i = 0; i < 2; i++) {
			for(var j = 1; j <= cardTwin; j++) {
				cardNum.push(j);
			}
		}

		//1 ~ 8 배열 섞기
		for(var i = 0; i < cardLength; i++) {
			cardNumMix = Math.floor(Math.random() * cardLength);
			cardNumBox = cardNum[i];
			cardNum[i] = cardNum[cardNumMix];
			cardNum[cardNumMix] = cardNumBox;
		}

		//숫자 카드에 뿌리기
		for(var i = 0; i< cardLength; i++) {
			$('.card').eq(i).attr('data-num', cardNum[i]).html(cardNum[i]);
		}

		//맨처음 보여주기
		$('.card').addClass('current');
		setTimeout( function() {
			$('.card').removeClass('current');
		}, 5000);
	};

	this.handleClickEvent = function() {
		var clickNum = 0;
		var firstNum;
		var secondNum;

		//카드게임 클릭
		$('.card').on('click', function() {
			if(!$(this).hasClass('current') && !$(this).hasClass('done') && $('.card.current').length < 2) {
				$(this).addClass('current');
				clickNum++;
				if(clickNum == 1) {
					firstNum = $(this).attr('data-num');
				} else if(clickNum == 2) {
					secondNum = $(this).attr('data-num');
					m4.cardGame.handleClickFunc(firstNum, secondNum);
					clickNum = 0;
				}
			}
		});
	}

	this.handleClickFunc = function(firstNum, secondNum) {
		if(firstNum == secondNum) {
			$('.card.current').addClass('done').removeClass('current');
			this.score++;
			$('.scoreNum').val(this.score);
			if($('.card').length == $('.card.done').length) {
				setTimeout( function() {
					alert('짝짝짝 잘했어요!');
				}, 1000);
			}
		}else {
  			//카드보여준다음 removeClass시키고 싶어서 setTimeout 사용
			setTimeout( function() {
				$('.card.current').removeClass('current');
			}, 1000);
		}
	};
};

$( function() {
	m4.cardGame.init();
});