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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/volunteerPosts"
        );
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
        <span className="ml-3 text-lg font-semibold dark:text-white">
          Fetching Opportunities...
        </span>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto py-8 px-4"
      style={{ width: "80%", margin: "0 auto" }}
    >
      <h2 className="font-extrabold text-3xl text-center">
        Volunteers Needed per Post
      </h2>
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
