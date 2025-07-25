import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
  {
    id : '1',
    deliveryDays : 7,
    priceCents : 0
  },
    {
    id : '2',
    deliveryDays : 3,
    priceCents : 499
  },
    {
    id : '3',
    deliveryDays : 1,
    priceCents : 999
  }
];

export function getDeliveryOptions(deliveryOptionId){

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(deliveryOptionId === option.id){
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOption[0];

}

 function isWeekend(date){
        let result = '';
        result = date.format('dddd');
        if(result === 'Saturday' || result === 'Sunday'){
          return result;
        }
  }

export function calculateDeliveryDate(deliveryOption){

  const todayDate = dayjs();
  let count = 0;
  let i=1;
  let remainingDayAdd = deliveryOption.deliveryDays;
  let resultantDate = '';

  while(remainingDayAdd !=0){

    const deliveryDate = todayDate.add(i , 'days');
    resultantDate  = isWeekend(deliveryDate);

    if(resultantDate === 'Saturday' || resultantDate === 'Sunday'){
      count++;
    }
    else{
      count++;
      remainingDayAdd--;
    }
    i++;
  }

  const deliveryDate = todayDate.add(count , 'days');
  const dateString = deliveryDate.format('dddd, MMMM DD');

  return dateString;

}