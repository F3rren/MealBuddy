// esempio con fetch
useEffect(() => {
  fetch('http://localhost:8000/login')
    .then(res => res.json())
    .then(data => setTasks(data));
}, []);
