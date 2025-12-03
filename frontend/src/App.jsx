import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';




  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${STRAPI_URL}/api/articles`);
        setArticles(res.data.data); // your data is an array of objects
      } catch (err) {
        setError("Failed to fetch articles. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Latest Articles
      </h1>

      {loading && (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      )}

      {error && (
        <div className="text-center text-red-500 font-semibold mb-4">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white p-5 shadow-md rounded-xl hover:shadow-lg transition-all border"
            >
              <img
                src={article.imageLink}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md"
              />

              <h2 className="text-xl font-bold mt-3 text-gray-800">
                {article.title}
              </h2>

              <p className="text-gray-600 mt-2 line-clamp-3">
                {article.description}
              </p>

              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>✍ {article.author}</span>
              </div>

              <div className="text-xs text-gray-400 mt-1">
                Published: {article.publishedDate}
              </div>

              <div className="text-xs text-gray-400">
                Updated: {article.updatedDate}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
