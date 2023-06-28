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
import { useState } from "react";

const calendarDayCollection = collection(firestore, "dayData");

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [dayData, setDayData] = useState<QueryDocumentSnapshot<DocumentData>[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <p>Hello world!</p>
      </div>
    </main>
  );
}
