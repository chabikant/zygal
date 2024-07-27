document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart');

    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const labels = Object.keys(data);
            const values = Object.values(data);

            // Function to generate a random color
            const getRandomColor = () => {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                return `rgba(${r}, ${g}, ${b}, 0.6)`;
            };

            const backgroundColors = labels.map(() => getRandomColor());
            const borderColors = labels.map(() => getRandomColor().replace('0.6', '1'));

            new Chart(ctx, {
                type: 'pie',  // Pie chart
                data: {
                    labels: labels,
                    datasets: [{
                        label: '# of Submissions',
                        data: values,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    const label = tooltipItem.label || '';
                                    const value = tooltipItem.raw || '';
                                    return `${label}: ${value}`;
                                }
                            }
                        }
                    }
                }
            });
        });
});
