
import discord
from discord import app_commands
from config import MEDIRDV_URL


# probleme
class ProblemeModal(discord.ui.Modal):
    def __init__(self, nom, date, heure, lang):
        self.nom = nom
        self.date = date
        self.heure = heure
        self.lang = lang

        title = "Your issue" if lang == "en" else "Votre problème"
        super().__init__(title=title)

        if lang == "en":
            self.probleme = discord.ui.TextInput(
                label="Describe your issue",
                placeholder="e.g. I have a toothache since 3 days...",
                style=discord.TextStyle.paragraph,
                required=True,
                max_length=300
            )
        else:
            self.probleme = discord.ui.TextInput(
                label="Décris ton problème",
                placeholder="ex: J'ai une douleur dentaire depuis 3 jours...",
                style=discord.TextStyle.paragraph,
                required=True,
                max_length=300
            )

        self.add_item(self.probleme)

    async def on_submit(self, interaction: discord.Interaction):
        lang = self.lang

        if lang == "en":
            embed = discord.Embed(
                title="✅ Appointment Summary",
                description="Here is a summary of your appointment request:",
                color=discord.Color.green()
            )
            embed.add_field(name="👤 Name", value=self.nom, inline=True)
            embed.add_field(name="📅 Date", value=self.date, inline=True)
            embed.add_field(name="🕐 Time", value=self.heure, inline=True)
            embed.add_field(name="🩺 Issue", value=self.probleme.value, inline=False)
            embed.add_field(
                name="📌 Next step",
                value="Click the button below to confirm your appointment on **médiRDV**.",
                inline=False
            )
            embed.set_footer(text="See you soon! 👋")
            button_label = "Confirm on médiRDV"
        else:
            embed = discord.Embed(
                title="✅ Récapitulatif de votre rendez-vous",
                description="Voici un résumé de votre demande de rendez-vous :",
                color=discord.Color.green()
            )
            embed.add_field(name="👤 Nom", value=self.nom, inline=True)
            embed.add_field(name="📅 Date", value=self.date, inline=True)
            embed.add_field(name="🕐 Heure", value=self.heure, inline=True)
            embed.add_field(name="🩺 Problème", value=self.probleme.value, inline=False)
            embed.add_field(
                name="📌 Prochaine étape",
                value="Clique sur le bouton ci-dessous pour confirmer ton RDV sur **médiRDV**.",
                inline=False
            )
            embed.set_footer(text="À bientôt ! 👋")
            button_label = "Confirmer sur médiRDV"

        view = discord.ui.View()
        view.add_item(discord.ui.Button(
            label=button_label,
            url=MEDIRDV_URL,
            style=discord.ButtonStyle.link,
            emoji="🏥"
        ))

        await interaction.response.send_message(embed=embed, view=view, ephemeral=True)



class ProblemeButton(discord.ui.View):
    def __init__(self, nom, date, heure, lang):
        super().__init__()
        self.nom = nom
        self.date = date
        self.heure = heure
        self.lang = lang

    @discord.ui.button(label="Continuer ➜", style=discord.ButtonStyle.primary, emoji="➡️")
    async def continuer(self, interaction: discord.Interaction, button: discord.ui.Button):
        await interaction.response.send_modal(
            ProblemeModal(self.nom, self.date, self.heure, self.lang)
        )


# modal pour nom date etc
class RdvModal(discord.ui.Modal):
    def __init__(self, lang):
        self.lang = lang
        title = "Book an Appointment" if lang == "en" else "Prendre un Rendez-vous"
        super().__init__(title=title)

        if lang == "en":
            self.nom = discord.ui.TextInput(
                label="Full Name",
                placeholder="John Doe",
                required=True,
                max_length=50
            )
            self.date = discord.ui.TextInput(
                label="Preferred Date",
                placeholder="e.g. 25/04/2025",
                required=True,
                max_length=20
            )
            self.heure = discord.ui.TextInput(
                label="Preferred Time",
                placeholder="e.g. 10:30",
                required=True,
                max_length=10
            )
        else:
            self.nom = discord.ui.TextInput(
                label="Nom complet",
                placeholder="Jean Dupont",
                required=True,
                max_length=50
            )
            self.date = discord.ui.TextInput(
                label="Date souhaitée",
                placeholder="ex: 25/04/2025",
                required=True,
                max_length=20
            )
            self.heure = discord.ui.TextInput(
                label="Heure souhaitée",
                placeholder="ex: 10h30",
                required=True,
                max_length=10
            )

        self.add_item(self.nom)
        self.add_item(self.date)
        self.add_item(self.heure)

    async def on_submit(self, interaction: discord.Interaction):
        lang = self.lang

        if lang == "en":
            embed = discord.Embed(
                title="🩺 Almost done!",
                description="One last step — describe your issue.",
                color=discord.Color.blue()
            )
        else:
            embed = discord.Embed(
                title="🩺 Presque terminé !",
                description="Dernière étape — décris ton problème de santé.",
                color=discord.Color.blue()
            )

        view = ProblemeButton(
            nom=self.nom.value,
            date=self.date.value,
            heure=self.heure.value,
            lang=lang
        )

        await interaction.response.send_message(embed=embed, view=view, ephemeral=True)


# la commande /rdv
def setup_rdv(tree: app_commands.CommandTree):

    @tree.command(
        name="rdv",
        description="Prendre un rendez-vous / Book an appointment"
    )
    @app_commands.describe(
        langue="Langue de la réponse / Response language"
    )
    @app_commands.choices(langue=[
        app_commands.Choice(name="Français", value="fr"),
        app_commands.Choice(name="English", value="en"),
    ])
    async def rdv(interaction: discord.Interaction, langue: app_commands.Choice[str] = None):
        lang = langue.value if langue else "fr"
        await interaction.response.send_modal(RdvModal(lang=lang))