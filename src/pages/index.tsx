import { Inter } from "next/font/google";
import { firestore } from "../../firebase/clientApp";
import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
} from "@firebase/firestore";
import { useEffect, useState } from "react";

const todosCollection = collection(firestore, "dayTodos");

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  const getTodos = async () => {
    const todosQuery = query(
      todosCollection,
      where("done", "==", false),
      limit(9)
    );

    const querySnapshot = await getDocs(todosQuery);

    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });

    setTodos(result);
  };

  useEffect(() => {
    getTodos();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <p>Hello world!</p>
      </div>
      <div className="">
        {loading ? (
          <div className="">
            <h2>Loading</h2>
          </div>
        ) : (
          todos.map((todo) => {
            return (
              <div>
                <h2>{todo.data.arguments["title"]}</h2>
                <p>{todo.data.arguments["description"]}</p>
                <button type="button">Mark as done</button>
                <button type="button">Delete</button>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
