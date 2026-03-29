import { useState } from "react";
import TvSerie from "./TvSerie";
export default function TvSeriesList({ TvSeries, title }) {
  const [isTvSeriesListOpen, setIsTvSeriesListOpen] = useState(true);
  return (
    <div className="container my-3">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between">
          <h2 className="h5">{title}</h2>
          <button
            className="btn text-bg-danger"
            onClick={() => setIsTvSeriesListOpen((prev) => !prev)}
          >
            {isTvSeriesListOpen ? (
              <i className="bi bi-dash-circle"></i>
            ) : (
              <i className="bi bi-plus-circle"></i>
            )}
          </button>
        </div>
        {isTvSeriesListOpen && (
          <div className="card-body">
            {TvSeries.length > 0 ? (
              <div
                id="TvSerie-List"
                className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4"
              >
                {TvSeries.map((t, index) => (
                  <TvSerie key={index} tvSerie_Data={t} />
                ))}
              </div>
            ) : (
              <div>Dizi Bulunamadı</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
