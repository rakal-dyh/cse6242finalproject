function Sort(arr){
  var minIdx, temp, 
      len = arr.length;
  for(var i = 0; i < 3; i++){
    minIdx = i;
    for(var  j = i+1; j<len; j++){
       if(arr[j]<arr[minIdx]){
          minIdx = j;
       }
    }
    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
	top3[i]=minIdx;
  }
  return top3;
}