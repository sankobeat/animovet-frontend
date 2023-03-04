import styles from "@/styles/Landing.module.css";
import Image from "next/image";

export default function Landing() {
  return (
    <section>
      <div className="container">
        <div className={styles.landing}>
          <div className={styles.landing_left}>
            <div className={styles.landing_text}>
              <h1>you pet is in a safe hands</h1>
              <hr />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                doloremque reprehenderit natus quo at, non veritatis ad quas
                minus laudantium consectetur voluptate. Unde harum aspernatur,
                error neque laudantium, nulla eveniet optio voluptate
                consequuntur, dolorem explicabo.
              </p>
            </div>
          </div>
          <div className={styles.landing_right}>
            <Image
              className={styles.landing_image}
              src="/landing.png"
              height={1750}
              width={1750}
              alt="cat & dog"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
