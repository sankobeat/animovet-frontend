import Header from "@/components/header";
import styles from "@/styles/ReservePage.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { reservationStore, userStore } from "@/state/store";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Footer from "@/components/footer";
const workHours = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];
export default function Reserve() {
  const router = useRouter();
  const [userLS, setUserLS] = useState({});

  const user = userStore((state) => state.user);
  const storeReservation = reservationStore((state) => state.storeReservation);
  const [theDate, setTheDate] = useState("");
  const [reservedHours, setReservedHours] = useState([]);

  useEffect(() => {
    setUserLS(user);
  }, [user]);

  const [form, setForm] = useState({
    name: "",
    petType: "",
    phoneNumber: "",
    reservedDate: theDate,
    reservedTime: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getReservedHours = async (date) => {
    const { data } = await axios.post("/api/reservation/reserved-times", {
      date,
    });

    const filtredDate = data.map((item) => item.reservationDate.time);
    setReservedHours(filtredDate);
  };

  useEffect(() => {
    if (theDate === "") {
      return;
    } else {
      getReservedHours(theDate);
    }
  }, [theDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const { data } = await axios.post("/api/reservation/register", {
          id: user._id,
          petType: form.petType,
          description: form.description,
          reservedDate: theDate,
          reservedTime: form.reservedTime,
        });
        router.push(`/reservation/${data?._id}`);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/reservation/register",
          { ...form, reservedDate: theDate }
        );

        router.push(`/reservation/${data?._id}`);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Header />
      <section>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <div className="container">
          <div className={styles.reserve_page}>
            <div className={styles.pet_image_container}>
              <Image
                className={styles.pet_image}
                src="/reserve-pets.png"
                width={1084}
                height={474}
                alt="pets"
              />
            </div>
            <div className={styles.text}>
              <h1>RÉSERVEZ POUR VOTRE ANIMAL</h1>
              <p>VEUILLEZ REMPLIR LES CHAMPS CI-DESSOUS</p>
            </div>
            <div className={styles.formWrapper}>
              {/* form */}
              {userLS ? (
                <form
                  className="w-100 color-blue bolder"
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
                    <label htmlFor="petType" className="form-label">
                      Animal
                    </label>
                    <input
                      onChange={handleChange}
                      name="petType"
                      type="text"
                      className="form-control"
                      id="petType"
                      aria-describedby="petHelp"
                    />
                    <div id="petHelp" className="form-text">
                      Quel animal de compagnie avez-vous ?
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="reservedDate" className="form-label">
                      Date de visite
                    </label>
                    <DatePicker
                      className="form-control"
                      selected={theDate}
                      onChange={(date) => setTheDate(date)}
                      minDate={new Date()}
                      filterDate={(date) =>
                        date.getDay() !== 6 && date.getDay() !== 5
                      }
                    />
                    <div id="dateHelp" className="form-text">
                      À quelle date prévoyez-vous de nous rendre visite ?
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Heure de visite
                    </label>
                    <select
                      onChange={handleChange}
                      name="reservedTime"
                      className="form-select"
                      size="8"
                      multiple={false}
                      aria-label="reservedTime"
                    >
                      {workHours.map((item, index) => {
                        return (
                          <option
                            className={
                              reservedHours.includes(item)
                                ? styles.not_active
                                : styles.active
                            }
                            value={item}
                            key={index}
                            disabled={
                              reservedHours.includes(item) ? true : false
                            }
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>

                    <div id="reservedTime" className="form-text">
                      Les horaires marqués en rouge sont déjà réservés.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="caseDescription" className="form-label">
                      Peut-être que vous voulez nous dire quelque chose à propos
                      de votre cas ?
                    </label>
                    <textarea
                      onChange={handleChange}
                      name="description"
                      className="form-control"
                      id="caseDescription"
                      rows="3"
                      aria-label="caseDescriptionUn"
                    ></textarea>
                    <div id="caseDescriptionUn" className="form-text">
                      ce champ est facultatif.
                    </div>
                  </div>
                  <button type="submit" className="back-blue">
                    Envoyer
                  </button>
                </form>
              ) : (
                <form
                  className="w-100 color-blue bolder"
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nom complet.
                    </label>
                    <input
                      onChange={handleChange}
                      name="name"
                      type="text"
                      className="form-control"
                      id="name"
                      aria-describedby="nameHelp"
                    />
                    <div id="nameHelp" className="form-text">
                      Nous aimerions connaître votre vrai nom.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="petType" className="form-label">
                      Animal
                    </label>
                    <input
                      onChange={handleChange}
                      name="petType"
                      type="text"
                      className="form-control"
                      id="petType"
                      aria-describedby="petHelp"
                    />
                    <div id="petHelp" className="form-text">
                      Quel animal de compagnie avez-vous ?
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Téléphone
                    </label>
                    <input
                      onChange={handleChange}
                      name="phoneNumber"
                      type="number"
                      className="form-control"
                      id="phone"
                      aria-describedby="phoneHelp"
                    />
                    <div id="phoneHelp" className="form-text">
                      Quel est votre numéro de téléphone ?
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="reservedDate" className="form-label">
                      Date de visite
                    </label>
                    <DatePicker
                      className="form-control"
                      selected={theDate}
                      onChange={(date) => setTheDate(date)}
                      minDate={new Date()}
                      filterDate={(date) =>
                        date.getDay() !== 6 && date.getDay() !== 5
                      }
                    />
                    {/* <input
                      onChange={handleChange}
                      name="reservedDate"
                      type="date"
                      className="form-control"
                      id="date"
                      aria-describedby="dateHelp"
                    /> */}
                    <div id="dateHelp" className="form-text">
                      À quelle date prévoyez-vous de nous rendre visite ?
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Heure de visite
                    </label>
                    <select
                      onChange={handleChange}
                      name="reservedTime"
                      className="form-select"
                      size="8"
                      multiple={false}
                      aria-label="reservedTime"
                    >
                      {workHours.map((item, index) => {
                        return (
                          <option
                            className={
                              reservedHours.includes(item)
                                ? styles.not_active
                                : styles.active
                            }
                            value={item}
                            key={index}
                            disabled={
                              reservedHours.includes(item) ? true : false
                            }
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>

                    <div id="reservedTime" className="form-text">
                      Les horaires marqués en rouge sont déjà réservés.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="caseDescription" className="form-label">
                      Peut-être que vous voulez nous dire quelque chose à propos
                      de votre cas ?
                    </label>
                    <textarea
                      onChange={handleChange}
                      name="description"
                      className="form-control"
                      id="caseDescription"
                      rows="3"
                      aria-label="caseDescriptionUn"
                    ></textarea>
                    <div id="caseDescriptionUn" className="form-text">
                      ce champ est facultatif.
                    </div>
                  </div>
                  <button type="submit" className="back-blue">
                    Envoyer
                  </button>
                </form>
              )}
            </div>
            {/* <div className={styles.date_control}>
              <input type="date" name="date" onChange={handleDate} />
              <div className={styles.workContainer}>
                {workTime.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setTime(time)}
                    className={styles.work_hours}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <button onClick={handleSubmit}>submit</button>
            </div> */}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
