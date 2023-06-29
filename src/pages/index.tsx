import { Inter } from "next/font/google";
import { firestore } from "../firebase/clientApp";
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

const calendarDayCollection = collection(firestore, "dayData");

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dayData, setDayData] = useState<QueryDocumentSnapshot<DocumentData>>();

  const getDayData = async () => {
    const dayDataQuery = query(daysCollection, where("id", "==", true));

    const querySnapshot = await getDocs(dayDataQuery);

    const result: QueryDocumentSnapshot<DocumentData> = querySnapshot;

    setDayData(result);
  };

  useEffect(() => {
    getDayData();

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
          <p>dayData</p>
        )}
      </div>
    </main>
  );
}
