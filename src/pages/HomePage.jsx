import styles from "./HomePage.module.css";
import Task from "../components/Task";
import CreateBtn from "../components/CreateBtn";
function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <aside>
          <Task />
          <Task />
          <Task />
        </aside>

        <CreateBtn />
      </section>
    </main>
  );
}
export default HomePage;
