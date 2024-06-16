(() => {
	const $ = document.querySelector.bind(document);

	let timeRotate = 5000; 
	let currentRotate = 0;
	let isRotating = false;
	const wheel = $('.wheel');
	const btnWheel = $('.btn--wheel');
	const showMsg = $('.msg');
	const spinCountEl = $('.spin-count');
	const overlay = $('.overlay');
	const dialogMsg = $('.dialog-msg');
	const btnClose = $('.btn--close');
	const btnCopy = $('.btn--copy');
	let spinCount = 0;

	const listGift = [ // tùy chỉnh tỉ lệ quay :)), t nghĩ nên để tất cả là 0 trừ cái quay chúc bạn may mắn nên để là 100 :))) 
		// set tỉ lệ sao cho tránh lỗ là được, t làm demo nên có thể chỉnh gì tùy m
		{ text: 'KEY TỪ THỜI ĐIỂM HIỆN TẠI TỚI 12H ĐÊM', percent: 7 / 100, }, { text: 'KEY 1 GIỜ', percent: 6 / 100, },
		{ text: 'KEY 1 NGÀY', percent: 5 / 100, }, { text: 'KEY 1 TUẦN', percent: 4 / 100, },
		{ text: 'KEY 2 TUẦN', percent: 3 / 100, }, { text: 'KEY 3 TUẦN', percent: 2 / 100, },
		{ text: 'KEY 1 THÁNG', percent: 1 / 100, }, { text: 'CHÚC BẠN MAY MẮN LẦN SAU!!', percent: 90 /100, }, 
	];

	const size = listGift.length;
	const rotate = 360 / size;
	const skewY = 90 - rotate;

	listGift.map((item, index) => {
		const elm = document.createElement('li');
		elm.style.transform = `rotate(${
			rotate * index
		}deg) skewY(-${skewY}deg)`;

		if (index % 2 == 0) {
			elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
				rotate / 2
			}deg);" class="text text-1">
			<b>${item.text}</b>
		</p>`;
		} else {
			elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
				rotate / 2
			}deg);" class="text text-2">
		<b>${item.text}</b>
		</p>`;
		}

		wheel.appendChild(elm);
	});

	const start = () => {
		showMsg.innerHTML = '';
		isRotating = true;
		spinCount--;
		updateSpinCount();
		const random = Math.random();
		const gift = getGift(random);
		currentRotate += 360 * 10;
		rotateWheel(currentRotate, gift.index);
		showGift(gift);
	};

	const rotateWheel = (currentRotate, index) => {
		$('.wheel').style.transform = `rotate(${
			currentRotate - index * rotate - rotate / 2
		}deg)`;
	};

	const getGift = randomNumber => {
		let currentPercent = 0;
		let list = [];

		listGift.forEach((item, index) => {
			currentPercent += item.percent;

			if (randomNumber <= currentPercent) {
				list.push({ ...item, index });
			}
		});

		return list[0];
	};

	const showGift = (gift) => {
        let timer = setTimeout(() => {
            isRotating = false;
    
            dialogMsg.innerHTML = `<p><h1>BẠN ĐÃ QUAY VÀO</h1><a class="rainbow-xie"> ${gift.text}</a></p>`;
    
            overlay.style.display = 'flex';
    
            if (gift.text !== 'CHÚC BẠN MAY MẮN LẦN SAU!!') {
                btnCopy.style.display = 'block';
            } else {
                btnCopy.style.display = 'none';
            }
    
            clearTimeout(timer);
        }, timeRotate);
    };
    
	const updateSpinCount = () => {
		spinCountEl.innerText = `Lượt quay: ${spinCount}`;
		btnWheel.disabled = spinCount === 0;
	};

	btnWheel.addEventListener('click', () => {
		!isRotating && spinCount > 0 && start();
	});

	btnClose.addEventListener('click', () => {
		overlay.style.display = 'none';
	});

	btnCopy.addEventListener('click', () => {
		navigator.clipboard.writeText('XIE SPIN') // thay thế bằng cái khác key ( thay bằng api để tùy chỉnh )
			.then(() => alert('Đã sao chép key'))
			.catch(err => console.error('Lỗi khi sao chép:', err));
	});

	spinCount = 0; // mặc định t set là 0, muốn test thì tăng lên ( thay bằng api để tùy chỉnh số lượt quay )
	updateSpinCount();  
})();


// Nhớ test đi test lại xem bug chỗ nào không để t fix cho 