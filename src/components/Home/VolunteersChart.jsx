import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VolunteersChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://volunteer-server-nu.vercel.app/volunteerPosts");
        const posts = response.data;

       
        const titles = posts.map((post) => post.title);
        const volunteersNeeded = posts.map((post) => post.volunteersNeeded);

        
        setChartData({
          labels: titles,
          datasets: [
            {
              label: "Volunteers Needed",
              data: volunteersNeeded,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h2 className="font-extrabold text-3xl text-center">Volunteers Needed per Post</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
            tooltip: { enabled: true },
          },
          scales: {
            x: { title: { display: true, text: "Posts" } },
            y: { title: { display: true, text: "Volunteers Needed" } },
          },
        }}
      />
    </div>
  );
};

export default VolunteersChart;
