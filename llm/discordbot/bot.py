
import discord
from discord import app_commands
from dotenv import load_dotenv
import os

from rdv import setup_rdv

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")

intents = discord.Intents.default()
client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)

#Enregistrement des commandes 
setup_rdv(tree)



#Commande /aide 
@tree.command(name="aide", description="Afficher l'aide / Show help")
async def aide(interaction: discord.Interaction):
    embed = discord.Embed(
        title="Commandes disponibles / Available commands",
        color=discord.Color.blurple()
    )
    embed.add_field(
        name="/rdv",
        value=" Prendre un rendez-vous sur médiRDV\nBook an appointment on médiRDV",
        inline=False
    )
    embed.add_field(
        name="/praticiens",
        value=" Voir la liste des praticiens et leurs disponibilités\nSee practitioners and their availability",
        inline=False
    )
    embed.add_field(
        name="/aide",
        value=" Afficher ce message d'aide\n Show this help message",
        inline=False
    )
    embed.set_footer(text="Cabinet Médical • Powered by médiRDV")
    await interaction.response.send_message(embed=embed, ephemeral=True)



@client.event
async def on_ready():
    await tree.sync()
    print(f"Bot connecté en tant que {client.user}")
    print(f" Slash commands synchronisées.")


client.run(TOKEN)