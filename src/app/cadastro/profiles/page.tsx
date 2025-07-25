import ProfilesForm from "../../components/profiles_form"
import Footer from "../../components/ui/footer"

export default function Profiles() {
  return (
    <div className="justify-items-center pb-20 sm:p-8">
      <main>
        <ProfilesForm/>
      </main>
      <Footer/>
    </div>
  );
}