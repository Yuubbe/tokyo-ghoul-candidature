"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Shield, FileText, Lock, Volume2, VolumeX, Zap, Activity } from "lucide-react"

export default function Component() {
  const [stage, setStage] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showCandidature, setShowCandidature] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [showGlitch, setShowGlitch] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isMounted, setIsMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])
  const [matrixChars, setMatrixChars] = useState<
    Array<{ left: string; delay: string; duration: string; char: string }>
  >([])

  useEffect(() => {
    setIsMounted(true)

    // Générer les particules
    const newParticles = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
    }))
    setParticles(newParticles)

    // Générer les caractères de matrice
    const newMatrixChars = Array.from({ length: 100 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 3}s`,
      char: Math.random().toString(36).substring(7),
    }))
    setMatrixChars(newMatrixChars)
  }, [])

  useEffect(() => {
    if (stage === 0) {
      const timer = setTimeout(() => setStage(1), 1000)
      return () => clearTimeout(timer)
    }
    if (stage === 1) {
      const timer = setTimeout(() => setStage(2), 2000)
      return () => clearTimeout(timer)
    }
    if (stage === 2) {
      const timer = setTimeout(() => setStage(3), 1500)
      return () => clearTimeout(timer)
    }
    if (stage === 3) {
      const timer = setTimeout(() => setStage(4), 2000)
    }
  }, [stage])

  useEffect(() => {
    // Effet de glitch aléatoire
    const glitchInterval = setInterval(
      () => {
        setShowGlitch(true)
        setTimeout(() => setShowGlitch(false), 150)
      },
      Math.random() * 5000 + 3000,
    )

    return () => clearInterval(glitchInterval)
  }, [])

  const handleAccess = () => {
    setIsAuthenticated(true)
    setTimeout(() => setShowCandidature(true), 2000)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
      audioRef.current.muted = true
      audioRef.current.play().catch(() => {})
    }
  }, [])

  const toggleAudio = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsPlaying(!audioRef.current.muted)
      if (!audioRef.current.paused) return
      audioRef.current.play().catch(() => {})
    }
  }

  if (showCandidature) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white p-8 relative overflow-hidden">
        {/* Particules flottantes */}
        <div className="fixed inset-0 pointer-events-none">
          {isMounted &&
            particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-float"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
        </div>

        {/* Effet de scan */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent animate-scan" />
        </div>

        {/* Contrôle audio */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={toggleAudio}
            variant="outline"
            size="sm"
            className="bg-black/80 border-red-500/50 text-red-400 hover:bg-red-900/20 animate-pulse-slow"
          >
            {!audioRef.current?.muted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>

        {/* Audio element */}
        <audio ref={audioRef} src="/glassy.mp3" preload="auto" className="hidden" loop />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className={`text-center mb-8 animate-fade-in-up ${showGlitch ? "animate-glitch" : ""}`}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-red-500 animate-pulse" />
              <h1 className="text-3xl font-bold text-red-400 animate-glow">DOSSIER CLASSIFIÉ</h1>
              <Shield className="w-8 h-8 text-red-500 animate-pulse" />
            </div>
            <p className="text-xl text-gray-300 animate-typing">SUJET-OMÉGA N°003</p>
            <p className="text-lg text-red-300 mt-2 animate-fade-in-delayed">CANDIDATURE - MENTOR QUINX</p>
          </div>

          <Card className="bg-black/50 border-red-500/30 backdrop-blur-sm animate-card-appear shadow-2xl shadow-red-500/20">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-4 animate-slide-in-left">
                  <h2 className="text-2xl font-bold text-red-400 mb-2 flex items-center gap-2">
                    <Activity className="w-6 h-6 animate-pulse" />
                    PROFIL DU CANDIDAT
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <div className="space-y-2 animate-fade-in-stagger">
                      <p className="hover:text-red-300 transition-colors">
                        <span className="text-red-400 font-semibold">Nom:</span> Yuu Sumehoshi
                      </p>
                      <p className="hover:text-red-300 transition-colors">
                        <span className="text-red-400 font-semibold">Âge:</span> 22 ans
                      </p>
                      <p className="hover:text-red-300 transition-colors">
                        <span className="text-red-400 font-semibold">Poste actuel:</span> Inspecteur CCG
                      </p>
                      <p className="hover:text-red-300 transition-colors">
                        <span className="text-red-400 font-semibold">Contact Discord:</span> bsb_yuu
                      </p>
                    </div>
                    <div className="space-y-2 animate-fade-in-stagger-delayed">
                      <p className="hover:text-red-300 transition-colors">
                        <span className="text-red-400 font-semibold">Spécialisation:</span> Formation Quinx
                      </p>
                      <p className="hover:text-red-300 transition-colors">
                        <span className="text-red-400 font-semibold">Niveau de clearance:</span> OMEGA
                      </p>
                      <p className="hover:text-red-300 transition-colors">
                        <span className="text-red-400 font-semibold">Statut:</span> CANDIDAT MENTOR
                      </p>
                      <p className="hover:text-red-300 transition-colors">
                        <span className="text-red-400 font-semibold">Division:</span> SQUAD QUINX
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4 animate-slide-in-right">
                  <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 animate-pulse" />
                    HISTOIRE PERSONNELLE
                  </h3>
                  <div className="bg-gray-900/50 p-4 rounded border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                      {/* Enfance et famille */}
                      <div className="animate-text-reveal">
                        <p className="mb-3">
                          <span className="text-red-400 font-semibold animate-glow">Origines:</span> Né dans le 20ème
                          arrondissement de Tokyo, Yuu Sumehoshi a grandi comme tous ses autres amis d'enfances. Il mené
                          une vie normale avec sa mère et son père.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/30">
                          Sa mère était une femme au foyer, elle était douce, calme et attentionnée. Son père, était
                          pour Yuu un homme de bureau à la fois perfectionniste, il ne parlait pratiquement jamais de
                          son travail à la maison, mais il avait l'air d'y passer énormément de temps.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/30">
                          Alors avec ma mère, on se retrouvé souvent à attendre son retour tard le soir, pour passer le
                          temps on jouer à des jeux elle et moi ou elle me lisait des histoires.
                        </p>
                      </div>

                      {/* La disparition */}
                      <div className="animate-text-reveal-delayed bg-red-900/10 p-3 rounded border border-red-500/20">
                        <p className="mb-3">
                          <span className="text-red-400 font-semibold">La Disparition:</span> Jusqu'au jour où il ne
                          revint pas. Ma mère me disait qu'il allait revenir bientot, elle en était persuadée, dû moins
                          je pense qu'elle essayait de me rassurer. Alors j'attendis mon père, heures après heures,
                          jours après jours mais toujours rien.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/50">
                          Puis un jour, des hommes en costume sont venus à la maison, ils avaient l'air sérieux et
                          inquiets. Ils ont parlé à ma mère, mais je n'ai pas tout compris. J'ai juste entendu des mots
                          comme "nous sommes désolés" et "mes condoléances".
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/50">
                          Lorsqu'il sont partis, ma mère était en larmes, elle m'a pris dans ses bras. A ce moment-là je
                          n'avais pas compris ce qui s'était passé, mais je savais que quelque chose de grave était
                          arrivé.
                        </p>
                      </div>

                      {/* La lutte de la mère */}
                      <div className="animate-text-reveal-delayed-2">
                        <p className="mb-3">
                          <span className="text-red-400 font-semibold">La Lutte:</span> Ensuite ma mère c'est mise à
                          trouver du travail, elle a commencé à travailler dur pour subvenir à nos besoins. Elle était
                          forte et courageuse, mais je pouvais voir qu'elle était triste. J'ai essayé de l'aider du
                          mieux que je pouvais, mais je n'étais qu'un enfant.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/30">
                          Elle était femme de ménage, elle travaillait dur pour nous offrir une vie décente. Malgré les
                          difficultés, elle a toujours été là pour moi, me soutenant et m'encourageant à poursuivre mes
                          rêves.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/30">
                          Je ne savais pas vraiment ce que je voulais faire plus tard mais je sais que je voulais aider
                          les gens, et surtout ma mère qui avait tant fait pour moi.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/30">
                          Quelques années plus tard, des histoires sur des goules on commencer à être diffuser sur les
                          chaines d'informations. De mon côté ma mère enchainer les petits boulots, c'était mon modèle,
                          elle m'a appris que même lorsqu'on est en difficulté il faut savoir faire preuve de générosité
                          avec les plus démunis. Comme avec mon Oncle qui venait souvent demander de l'argent à ma mère
                          tandis que lui ne travaillait surement pas.
                        </p>
                      </div>

                      {/* La perte de la mère */}
                      <div className="animate-text-reveal-delayed-3 bg-red-900/20 p-3 rounded border border-red-500/30">
                        <p className="mb-3">
                          <span className="text-red-400 font-semibold">La Perte:</span> Malheuresement, un jour ma mère
                          est morte de surmenage, elle avait trop travaillé pour subvenir à nos besoins et elle n'a pas
                          pu se reposer. J'étais dévasté, j'avais perdu les personnes les plus importante de ma vie. Et
                          bien sur, je n'avais personne à qui parler de tout ça, pas même un ami, j'étais seul.
                        </p>
                      </div>

                      {/* Les études et l'engagement */}
                      <div className="animate-text-reveal-delayed-4">
                        <p className="mb-3">
                          <span className="text-red-400 font-semibold">La Détermination:</span> J'ai donc décidé de me
                          concentrer sur mes études, je voulais réussir pour ma mère, pour lui prouver que je pouvais
                          être quelqu'un de bien malgré tout ce qui s'était passé.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/30">
                          J'ai travaillé dur à l'école, j'ai étudié la psychologie et les sciences sociales, pensant que
                          je pourrais aider les gens d'une manière ou d'une autre. J'ai donc obtenu mon diplôme avec
                          mention, mais je savais que ce n'était pas suffisant. Je voulais faire quelque chose de plus,
                          quelque chose qui aurait un impact réel sur la société.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/30">
                          J'ai donc commencé à chercher un emploi dans le secteur social, mais je n'ai pas trouvé
                          grand-chose. Les offres d'emploi étaient rares et la concurrence était rûde.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/30">
                          A l'age de mes 20 ans, j'ai décidé de m'engager dans l'armée n'étant que diplomé de la faculté
                          de psychologie, je me suis dit que c'était le meilleur moyen de pouvoir aider les gens.
                        </p>
                      </div>

                      {/* La découverte du CCG */}
                      <div className="animate-text-reveal-delayed-5 bg-green-900/10 p-3 rounded border border-green-500/20">
                        <p className="mb-3">
                          <span className="text-red-400 font-semibold">La Révélation:</span> Puis un jour, alors que je
                          revenais d'une mission à l'étranger,j'entendis parler du CCG, une organisation gouvernementale
                          qui luttait contre les goules. Je me suis renseigné et j'ai découvert qu'ils avaient besoin de
                          personnes pour les aider dans leur combat.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-green-500/30">
                          J'ai décidé de postuler, pensant que c'était l'occasion de faire quelque chose de bien pour la
                          société et de rendre ma mère fière. J'ai donc postulé à l'académie du CCG, ou il nous apprenne
                          beaucoup de choses du moins de façon théorique sur les goules, leur mode de vie, leur
                          psychologie et comment les combattre, les types de kagune, les armes utilisées par les
                          enquêteurs, etc.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-green-500/30">
                          1 ans plus tard, j'ai été diplômé de l'académie et j'ai été affecté au quartier général du CCG
                          en tant qu'inspecteur.
                        </p>
                      </div>

                      {/* La découverte sur le père */}
                      <div className="animate-text-reveal-delayed-6 bg-yellow-900/10 p-3 rounded border border-yellow-500/20">
                        <p className="mb-3">
                          <span className="text-red-400 font-semibold">La Vérité:</span> Ce n'est que plus tard, lorsque
                          je rédigé un rapport d'enquête sur une affaire d'une ghoule que je tombai sur un dossier
                          d'enquête avec le même nom de famille que le mien. Je regardai le dossier et je vis que
                          c'était mon père, il avait été tué par une ghoule il y a des années.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-yellow-500/30">
                          Maintenant la raison pour laquelle il ne revenait pas à la maison était claire, il avait été
                          tué par une ghoule. J'étais en colère et triste, mais je savais que je devais continuer à me
                          battre pour ma mère et pour toutes les personnes qui avaient perdu la vie à cause des goules.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-yellow-500/30">
                          J'ai donc décidé de me concentrer sur mon travail au CCG, de devenir un inspecteur compétent
                          et de protéger les citoyens de Tokyo contre les goules. J'ai commencé à travailler dur, à
                          m'entraîner et à apprendre tout ce que je pouvais sur les goules et leur psychologie.
                        </p>
                      </div>

                      {/* La mission fatale */}
                      <div className="animate-text-reveal-delayed-7 bg-red-900/20 p-3 rounded border border-red-500/40">
                        <p className="mb-3">
                          <span className="text-red-400 font-semibold">La Mission Fatale:</span> Puis un jour, une
                          mission importante à été lancée mais par l'entièreté du CCG, il s'aggissait d'une opération
                          visant à capturer un groupe de goules particulièrement dangereuses qui terrorisaient la ville.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/50">
                          Comme tous les autres inspecteurs, j'ai été envoyé sur le terrain pour participer à cette
                          mission. Je ne savais pas que cette mission allait ma dernière, mais je savais que c'était une
                          occasion de prouver ma valeur et de faire quelque chose de bien pour la société.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/50">
                          Lors de cette mission, j'ai été confronté à une ghoule particulièrement puissante et
                          intelligente. Elle avait un kagune très développé surement un kakuja, et elle était très agile
                          et avait une capacité de régénération incroyable.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-red-500/50">
                          Ce combat pour moi fut un véritable cauchemar, j'ai vu des collègues mourir sous mes yeux,
                          j'ai vu des gens innocents se faire tuer par cette ghoule.
                        </p>
                      </div>

                      {/* Le mystère final */}
                      <div className="animate-text-reveal-delayed-8 bg-purple-900/10 p-3 rounded border border-purple-500/20">
                        <p className="mb-3">
                          <span className="text-red-400 font-semibold">Le Mystère:</span> Je fus mortellement blessé,
                          c'est lorsque la mission prit fin que je me suis retrouvé dans un laboratoire du CCG,
                          inconscient. Je ne savais pas ce qui m'était arrivé, mais je savais que j'avais été sauvé par
                          le CCG.
                        </p>
                        <p className="mb-3 pl-4 border-l-2 border-purple-500/30">
                          Je ne suis toujours inconscient et je ne sais pas ce qu'il va advenir de moi. Allez t'on faire
                          des expériences sur moi ? Suis je mort ? Bonne question, à vrai dire tout cela m'effraye...
                        </p>
                        <p className="text-red-400 font-semibold animate-pulse">la suite en roleplay</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4 animate-slide-in-left">
                  <h3 className="text-xl font-bold text-red-400 mb-3">FORMATION</h3>
                  <div className="bg-gray-900/50 p-4 rounded border border-red-500/20">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <span className="text-red-400 font-semibold">Formation:</span> Diplômé de l'Académie CCG avec
                      mention, spécialisé en tactiques anti-goules et psychologie comportementale. Sa jeunesse lui a
                      permis de développer une approche moderne et adaptative face aux nouvelles menaces. Diplomé en
                      psychologie et sciences sociales, il a une compréhension approfondie des motivations humaines et
                      des dynamiques de groupe.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-red-400 font-semibold">Parcours:</span> Rapidement promu Inspecteur grâce à
                      ses résultats sur le terrain et sa capacité naturelle à comprendre et anticiper les comportements
                      goules. Reconnu pour son leadership instinctif et sa capacité à inspirer confiance aux jeunes
                      recrues.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4 animate-slide-in-right">
                  <h3 className="text-xl font-bold text-red-400 mb-3">MOTIVATIONS</h3>
                  <div className="bg-gray-900/50 p-4 rounded border border-red-500/20">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <span className="text-red-400 font-semibold">Vision personnelle:</span> En tant qu'Inspecteur
                      ayant côtoyé de près les réalités du terrain, je comprends les défis uniques auxquels font face
                      les Quinx. Ces jeunes investigateurs portent un fardeau que peu peuvent comprendre - être à la
                      fois humain et quelque chose de plus.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <span className="text-red-400 font-semibold">Engagement:</span> Ma motivation principale est de
                      créer un environnement où les Quinx peuvent s'épanouir sans perdre leur humanité. Trop
                      d'investigateurs prometteurs ont été perdus faute d'un encadrement adapté à leur nature
                      particulière.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-red-400 font-semibold">Héritage:</span> Honorer la mémoire de mon père en
                      formant la prochaine génération d'inspecteur, mais avec une approche plus humaine et compréhensive
                      que celle de l'ancienne garde.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4 animate-slide-in-left">
                  <h3 className="text-xl font-bold text-red-400 mb-3">POURQUOI MOI ET PAS UN AUTRE ?</h3>
                  <div className="bg-gray-900/50 p-4 rounded border border-red-500/20">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Cela fait maintenant, un moment que je joue sur le serveur, mais j'ai une connaisance approfondie
                      de l'univers de Tokyo Ghoul, et je suis passionné par la psychologie des personnages. Mon
                      expérience en tant qu'Inspecteur m'a permis de développer une approche adaptée pour former les
                      Quinx, en tenant compte de plusieurs facteurs sur les personnages RP. En tant que mentor, je
                      créerais un lien avec chaque membre de l'équipe afin de les comprendre et de pouvoir les aider à
                      surmonter leurs défis individuels. Je ne me contente pas de former des Quinx, je les guide pour
                      qu'ils deviennent des enquêteurs compétents et équilibrés, capables de gérer les pressions uniques
                      de leur rôles.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4 animate-slide-in-right">
                  <h3 className="text-xl font-bold text-red-400 mb-3">APPROCHE PÉDAGOGIQUE</h3>
                  <div className="bg-gray-900/50 p-4 rounded border border-red-500/20">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <span className="text-red-400 font-semibold">Philosophie:</span> Chaque Quinx est unique dans sa
                      relation avec son Kagune artificiel. Mon approche consiste à développer un programme
                      d'entraînement personnalisé qui respecte les limites individuelles tout en poussant chacun vers
                      l'excellence.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <span className="text-red-400 font-semibold">Méthodes:</span> Combinaison d'entraînement physique
                      rigoureux, de sessions de méditation pour le contrôle mental, et de simulations réalistes.
                      L'accent est mis sur la maîtrise de soi avant la puissance brute.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-red-400 font-semibold">Suivi psychologique:</span> Surveillance constante de
                      l'état mental des Quinx, avec des sessions régulières pour prévenir la perte d'humanité et
                      maintenir l'équilibre psychologique nécessaire à leur efficacité.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4 animate-slide-in-left">
                  <h3 className="text-xl font-bold text-red-400 mb-3">SCÉNARIO D'ÉVALUATION</h3>
                  <div className="bg-gray-900/50 p-4 rounded border border-red-500/20">
                    <p className="text-gray-300 leading-relaxed mb-3">
                      <span className="text-red-400 font-semibold">Situation:</span> Un jeune Quinx sous votre
                      supervision perd le contrôle de son Kagune lors d'une mission de routine. Les civils sont en
                      danger.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <span className="text-red-400 font-semibold">Réaction immédiate:</span> Priorité absolue à la
                      sécurité civile. J'évacuerais immédiatement la zone tout en tentant de rétablir le contact verbal
                      avec le Quinx. L'utilisation de techniques de respiration et d'ancrage mental que j'aurais
                      enseignées durant l'entraînement.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <span className="text-red-400 font-semibold">Intervention:</span> Si le contact verbal échoue,
                      intervention physique mesurée pour neutraliser temporairement le Quinx sans causer de dommages
                      permanents. Utilisation de points de pression spécifiques pour interrompre le flux de RC.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-red-400 font-semibold">Suivi:</span> Analyse complète de l'incident pour
                      identifier les facteurs déclencheurs. Révision du programme d'entraînement individuel et sessions
                      de soutien psychologique renforcées. Cette expérience deviendrait un cas d'étude pour améliorer la
                      formation de tous les Quinx.
                    </p>
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-red-500/30 animate-fade-in-up">
                  <p className="text-red-400 font-semibold text-lg mb-2 animate-pulse">
                    CLASSIFICATION: TOP SECRET - OMÉGA
                  </p>
                  <p className="text-gray-400 text-sm">
                    Ce document est strictement confidentiel. Toute divulgation non autorisée sera sanctionnée selon les
                    protocoles de sécurité de la CCG.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Effet de particules */}
        <div className="absolute inset-0">
          {isMounted &&
            particles.slice(0, 50).map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-green-500/50 rounded-full animate-particle"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                }}
              />
            ))}
        </div>

        <div className="text-center relative z-10">
          <div className="animate-pulse">
            <Shield className="w-16 h-16 text-green-500 mx-auto mb-4 animate-spin-slow" />
            <p className="text-green-500 text-xl font-mono animate-typing">ACCÈS AUTORISÉ</p>
            <p className="text-green-400 text-sm mt-2 animate-fade-in-delayed">Chargement du dossier...</p>
            <div className="mt-4 flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center overflow-hidden relative">
      {/* Effet de matrice en arrière-plan */}
      <div className="absolute inset-0 opacity-10">
        {isMounted &&
          matrixChars.map((char, i) => (
            <div
              key={i}
              className="absolute text-green-500 text-xs animate-matrix-rain"
              style={{
                left: char.left,
                animationDelay: char.delay,
                animationDuration: char.duration,
              }}
            >
              {char.char}
            </div>
          ))}
      </div>

      {/* Contrôle audio */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleAudio}
          variant="outline"
          size="sm"
          className="bg-black/80 border-red-500/50 text-red-400 hover:bg-red-900/20 animate-pulse-slow"
        >
          {!audioRef.current?.muted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src="/glassy.mp3" preload="auto" className="hidden" loop />

      <div className="text-center max-w-2xl mx-auto p-8 relative z-10">
        {stage >= 0 && (
          <div
            className={`transition-opacity duration-1000 ${stage >= 1 ? "opacity-100" : "opacity-0"} ${showGlitch ? "animate-glitch" : ""}`}
          >
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Lock className="w-8 h-8 text-red-500 animate-pulse" />
                <h1 className="text-2xl font-bold text-red-500 animate-glow">SYSTÈME SÉCURISÉ CCG</h1>
                <Lock className="w-8 h-8 text-red-500 animate-pulse" />
              </div>
              <div className="h-1 bg-red-500 animate-pulse animate-scan-line"></div>
            </div>
          </div>
        )}

        {stage >= 1 && (
          <div className={`transition-opacity duration-1000 ${stage >= 2 ? "opacity-100" : "opacity-0"} mb-6`}>
            <p className="text-green-400 text-lg mb-2 animate-typing">AUTHENTIFICATION EN COURS...</p>
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-8 bg-green-500 animate-pulse animate-wave"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>
        )}

        {stage >= 2 && (
          <div className={`transition-opacity duration-1000 ${stage >= 3 ? "opacity-100" : "opacity-0"} mb-6`}>
            <div className="border border-red-500 p-6 bg-red-900/10 animate-border-glow">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-red-400 animate-pulse" />
                <p className="text-red-400 text-xl font-bold animate-glow">DOSSIER CLASSIFIÉ</p>
              </div>
              <p className="text-red-300 text-lg animate-fade-in-delayed">NIVEAU DE SÉCURITÉ: TOP SECRET</p>
              <p className="text-red-200 text-sm mt-2 animate-fade-in-delayed-2">
                Accès restreint au personnel autorisé uniquement
              </p>
            </div>
          </div>
        )}

        {stage >= 3 && (
          <div className={`transition-opacity duration-1000 ${stage >= 4 ? "opacity-100" : "opacity-0"} mb-8`}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Eye className="w-8 h-8 text-yellow-500 animate-bounce" />
                <h2 className="text-3xl font-bold text-yellow-400 animate-glow">SUJET EXPERIMENTALE-OMÉGA N°003</h2>
                <Eye className="w-8 h-8 text-yellow-500 animate-bounce" />
              </div>
              <p className="text-yellow-300 text-xl mb-2 animate-typing">CANDIDATURE MENTOR QUINX</p>
              <p className="text-gray-400 text-sm animate-fade-in-delayed">Classification: ULTRA-CONFIDENTIEL</p>
            </div>
          </div>
        )}

        {stage >= 4 && (
          <div className="animate-fade-in-up">
            <div className="border border-green-500 p-6 bg-green-900/10 mb-6 animate-border-glow">
              <p className="text-green-400 mb-4 animate-typing">
                ATTENTION: Vous êtes sur le point d'accéder à des informations hautement classifiées concernant le
                programme Quinx de la Commission de Contre-mesures aux Goules.
              </p>
              <p className="text-yellow-400 text-sm mb-4 animate-fade-in-delayed">
                Seul le personnel autorisé de niveau OMÉGA peut consulter ce dossier.
              </p>
            </div>

            <Button
              onClick={handleAccess}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 text-lg border border-red-400 animate-pulse-slow hover:animate-glow transition-all duration-300"
            >
              ACCÉDER AU DOSSIER
            </Button>

            <p className="text-gray-500 text-xs mt-4 animate-fade-in-delayed-2">
              En cliquant, vous acceptez les termes de confidentialité de la CCG
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
