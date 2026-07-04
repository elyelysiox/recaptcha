document.hasStorageAccess().then((value) => {
  let finalValue = value ? 2 : 3;
  console.log(finalValue);
});
