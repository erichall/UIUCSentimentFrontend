const s = {
        yAxes: [{
              type: 'linear',
							display: true,
							position: 'left',
							id: 'y-axis-1',
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: 'Sentiment'
              }
          }, {
              type: 'linear',
							display: true,
							position: 'right',
              id: 'y-axis-2',
              stacked: true,
              gridLines: {
								drawOnChartArea: false,
							},
              scaleLabel: {
                display: true,
                labelString: '#Reddit posts'
              },
        }]
      };

export const chartOptions = {
      scales: s,
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      maintainAspectRatio: false,
      title: {
        display: false,
        text: ''
      },
      legend: {
        position: 'bottom',
        fontSize: 5
      }
    }

