export default function ErrorMessage({ message }) {
  return (
    <div role="alert" className="alert alert-danger my-3">
      {message}
    </div>
  );
}
